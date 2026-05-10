import { reactive } from 'vue';

export type ElMessageType = 'success' | 'warning' | 'error' | 'info';

interface ElMessageItem {
  id: number;
  message: string;
  type: ElMessageType;
}

interface ShowElMessageOptions {
  message: string;
  type?: ElMessageType;
  duration?: number;
}

export const elMessageState = reactive<{ items: ElMessageItem[] }>({
  items: [],
});

let nextMessageId = 1;

function show(options: ShowElMessageOptions | string) {
  const resolved =
    typeof options === 'string'
      ? { message: options, type: 'info' as ElMessageType, duration: 2200 }
      : {
          type: 'info' as ElMessageType,
          duration: 2200,
          ...options,
        };

  const trimmedMessage = resolved.message.trim();
  if (!trimmedMessage) {
    return;
  }

  const id = nextMessageId++;
  elMessageState.items.push({
    id,
    message: trimmedMessage,
    type: resolved.type,
  });

  window.setTimeout(() => {
    remove(id);
  }, resolved.duration);
}

export function remove(id: number) {
  const index = elMessageState.items.findIndex((item) => item.id === id);
  if (index >= 0) {
    elMessageState.items.splice(index, 1);
  }
}

export const ElMessage = Object.assign(show, {
  success(message: string, duration?: number) {
    show({ message, type: 'success', duration });
  },
  warning(message: string, duration?: number) {
    show({ message, type: 'warning', duration });
  },
  error(message: string, duration?: number) {
    show({ message, type: 'error', duration });
  },
  info(message: string, duration?: number) {
    show({ message, type: 'info', duration });
  },
});
