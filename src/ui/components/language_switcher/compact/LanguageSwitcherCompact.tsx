import {getLanguageNameShort, Language} from "@/utils/language/Language";
import style from "./style.module.scss"

interface compactSwitcherProps {
    customClass: string,
    language: Language,
    theme: "default" | "secondary"
}

export default function LanguageSwitcherCompact(
    {customClass, language, theme}: compactSwitcherProps
) {

    const themeStyle = theme === "default" ? style.default : style.secondary

    return (
        <div className={`${style.switcher} ${themeStyle} ${customClass}`}>
            <p className={style.text}>
                {
                    getLanguageNameShort(language)
                }
            </p>
        </div>
    )
}