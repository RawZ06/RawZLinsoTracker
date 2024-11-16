import {onMounted, watch, ref, watchEffect} from 'vue';

export function useCustomFont(tracker, fontName, fontFileName) {
    const fontFile = ref(`sources/${tracker}/${fontFileName}`);

    function loadFont(fontName, fontFile) {
        const fontFace = new FontFace(fontName, `url(/${fontFile}) format('truetype')`);
        fontFace.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        }).catch((error) => {
            console.error(`Failed to load font ${fontName}:`, error);
        });
    }

    onMounted(() => {
        loadFont(fontName, fontFile.value);
    });

    // Mettre à jour la police si fontName change
    watch(() => fontName, (newFontName) => {
        fontFile.value = `fonts/${newFontName}.ttf`;
        loadFont(newFontName, fontFile.value);
    });

    watchEffect(() => {
        document.documentElement.style.setProperty('--font-'+fontName.value, fontName.value);
    });
}