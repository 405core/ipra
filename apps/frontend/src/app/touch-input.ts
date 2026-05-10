import { reactive } from 'vue';

export type TouchInputMode =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal';

interface TouchInputState {
  isOpen: boolean;
  title: string;
  description: string;
  placeholder: string;
  value: string;
  multiline: boolean;
  inputMode: TouchInputMode;
  masked: boolean;
  confirmText: string;
}

interface OpenTouchInputOptions {
  title: string;
  description?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  inputMode?: TouchInputMode;
  masked?: boolean;
  confirmText?: string;
}

export const touchInputState = reactive<TouchInputState>({
  isOpen: false,
  title: '',
  description: '',
  placeholder: '',
  value: '',
  multiline: false,
  inputMode: 'text',
  masked: false,
  confirmText: '确认输入',
});

let activeResolver: ((value: string | null) => void) | null = null;

export function openTouchInput(options: OpenTouchInputOptions) {
  if (activeResolver) {
    activeResolver(null);
    activeResolver = null;
  }

  touchInputState.isOpen = true;
  touchInputState.title = options.title;
  touchInputState.description = options.description ?? '';
  touchInputState.placeholder = options.placeholder ?? '';
  touchInputState.value = options.value ?? '';
  touchInputState.multiline = options.multiline ?? false;
  touchInputState.inputMode = options.inputMode ?? 'text';
  touchInputState.masked = options.masked ?? false;
  touchInputState.confirmText = options.confirmText ?? '确认输入';

  return new Promise<string | null>((resolve) => {
    activeResolver = resolve;
  });
}

export function closeTouchInput() {
  finalizeTouchInput(null);
}

export function confirmTouchInput() {
  finalizeTouchInput(touchInputState.value);
}

function finalizeTouchInput(result: string | null) {
  const resolver = activeResolver;
  activeResolver = null;

  touchInputState.isOpen = false;
  touchInputState.title = '';
  touchInputState.description = '';
  touchInputState.placeholder = '';
  touchInputState.value = '';
  touchInputState.multiline = false;
  touchInputState.inputMode = 'text';
  touchInputState.masked = false;
  touchInputState.confirmText = '确认输入';

  resolver?.(result);
}
