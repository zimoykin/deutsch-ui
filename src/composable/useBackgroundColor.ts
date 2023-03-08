import { ref, Ref } from 'vue';

const colors = {
    flashCard: '#96C5CF',
    home: '#D9D9D9',
    search: '#D9D9D9',
    word: '#bae6db',
    profile: '#F4B9BA',
    addNewWord: '#F6E4DA',
    random: '#C2DDD6',
    default: '#D9D9D9',
    dictionary: '#96C5CF',
    category: '#81A1DE',
} as const;

/* eslint-disable */
function hexToRgbA(hex: string, opacity: number = 0.5) {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
    }
    throw new Error('bad request');
}

function useBackgroundColor(
    page?: string,
): Ref<string> {
    let color = '#9ab0b1';
    color = (() => {
        switch (page) {
            case 'dictionary': return colors.dictionary;
            case 'profile': return colors.profile;
            case 'home': return colors.home;
            case 'add-new': return colors.addNewWord;
            case 'random': return colors.random;
            case 'konjugation': return colors.default;
            case 'search': return colors.search;
            case 'category': return colors.category;
            case 'flashCard': return colors.flashCard;
            default: return colors.default;
        }
    })();

    return ref(color);
}

export { useBackgroundColor, hexToRgbA };
