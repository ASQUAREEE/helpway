import {translation} from "@/ui/translations/translation";
import translation_eng from "@/ui/translations/translation_eng.json"
import translation_ru from "@/ui/translations/translation_ru.json"
import translation_ua from "@/ui/translations/translation_ua.json"
import translation_de from "@/ui/translations/translation_de.json"

export enum Language {
    UA,
    ENG,
    RU,
    DE
}

export function getLanguageValueFromId(
    id: string
): Language {
    switch (id) {
        case '0':
            return Language.UA;
        case '1':
            return Language.ENG;
        case '2':
            return Language.RU;
        case '3':
            return Language.DE;
        default:
            return Language.ENG
    }
}

export function getLanguageValueFromCountryCode(code: string): Language {
    switch (code) {
        case 'RU':
            return Language.RU;
        case 'UA':
            return Language.UA;
        case 'DE':
            return Language.DE;
        default:
            return Language.ENG
    }
}

export function getLanguageValueFromEnum(
    enumValue: Language
): translation {
    const valueMap: { [key in Language]: translation } = {
        [Language.ENG]: translation_eng,
        [Language.RU]: translation_ru,
        [Language.UA]: translation_ua,
        [Language.DE]: translation_de
    };
    return valueMap[enumValue] || translation_eng;
}

export function getLanguageName(
    enumValue: Language
): string {
    const valueMap: { [key in Language]: string } = {
        [Language.ENG]: "🇺🇸 English",
        [Language.RU]: "🇷🇺 Русский",
        [Language.UA]: "🇺🇦 Українська",
        [Language.DE]: "🇩🇪 Deutsch"
    };
    return valueMap[enumValue];
}

export function getLanguageNameShort(
    enumValue: Language
): string {
    const valueMap: { [key in Language]: string } = {
        [Language.ENG]: "EN",
        [Language.RU]: "РУ",
        [Language.UA]: "УК",
        [Language.DE]: "DE"
    };
    return valueMap[enumValue];
}