import { watchEffect } from 'vue';

export function useHiddenScrollBarOnSmallWindow(isSmallWindow) {
    onMounted(() => {
        watchEffect(() => {
            const htmlElement = document.documentElement;

            if (isSmallWindow) {
                htmlElement.style.setProperty('scroll-width', 'none');
            } else {
                htmlElement.style.removeProperty('scroll-width');
            }
        });
    })
}