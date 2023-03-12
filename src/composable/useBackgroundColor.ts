import { ref, Ref } from 'vue';

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

const colors = {
    flashCard: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    home: {
        'background': 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(146,201,200,0.7) 65%, rgba(148,187,233,1) 100%)',
    },
    search: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    word: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    profile: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    addNewWord: {
        background: 'radial-gradient(circle, rgba(238,174,202,1) 26%, rgba(148,187,233,1) 100%)'
    },
    random: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    default: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
    dictionary: {
        'background': 'linear-gradient(180deg, rgba(238,174,202,0.7) 0%, rgba(146,201,200,0.6) 65%, rgba(148,187,233,0.7) 100%)',
    },
    category: {
        'background': 'linear-gradient(16deg, rgba(146,201,200,0.7) 0%, rgba(238,174,202,1) 65%, rgba(148,187,233,1) 100%)',
    },
} as const;

function useBackgroundColor(
    page?: string,
): Ref<Record<string, any>> {
    let color: Record<string, any> = {
        backgroundColor: '#9ab0b1'
    };
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
