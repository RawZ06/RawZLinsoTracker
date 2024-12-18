export default function useOpenSmallWindow(w, h) {
    const openInSmallWindow = () => {
        const url = window.location.href + '?scroll=true';
        const width = w ?? 600;
        const height = h ?? 400;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        window.open(
            url,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
    };
    const handleKeydown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            openInSmallWindow();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown);
    });
}