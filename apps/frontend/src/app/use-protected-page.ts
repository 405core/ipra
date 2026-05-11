import { onBeforeUnmount, onMounted } from 'vue';
import { disableDlpGuard, enableDlpGuard } from './dlp-guard';

export function useProtectedPage(pageContext: string) {
  onMounted(() => {
    if (typeof document === 'undefined') {
      return;
    }
    enableDlpGuard(pageContext);
  });

  onBeforeUnmount(() => {
    disableDlpGuard();
  });
}
