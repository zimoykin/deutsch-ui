/* eslint-disable */
function extractValue(lines: string[], val: string[]): string | undefined {
    let word;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < val.length; j++) {
            if (lines[i].trim().startsWith(val[j])) {
                word = lines[i].trim().replace(val[j], '').trim();
                break;
            }
        }
        if (word) {
            break;
        }
    }

    return word;
}

export function* inputParser(text?: string) {
    const lines = text?.split('\n') || [];

    yield extractValue(lines, ['ich']);
    yield extractValue(lines, ['du']);
    yield extractValue(lines, ['er/sie/es', 'er', 'sie', 'es']);
    yield extractValue(lines, ['wir']);
    yield extractValue(lines, ['ihr']);
    yield extractValue(lines, ['sie']);
}

/**
ich habe
du habest
er/sie/es habe
wir haben
ihr habet
sie haben
                            lines[0].replace('ich', '').trim(),
                        lines[1].replace('du', '').trim(),
                        lines[2].replace('er/sie/es', '').trim(),
                        lines[3].replace('wir', '').trim(),
                        lines[4].replace('ihr', '').trim(),
                        lines[5].replace('sie', '').trim(),
 */
