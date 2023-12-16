import {getLanguageName, Language} from "@/utils/language/Language";
import style from "./style.module.scss"

interface defaultSwitcherProps {
    customClass: string,
    language: Language
}

export default function LanguageSwitcherDefault({customClass, language}: defaultSwitcherProps) {
    return (
        <div className={`${style.switcher} ${customClass}`}>
            <p className={style.text}>
                {
                    getLanguageName(language)
                }
            </p>
        </div>
    )
}