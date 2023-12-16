import {LanguageContext} from "@/utils/language/LanguageContext"
import {useContext} from "react"
import LanguageSwitcherCompact from "@/ui/components/language_switcher/compact/LanguageSwitcherCompact";
import LanguageSwitcherDefault from "@/ui/components/language_switcher/default/LanguageSwitcherDefault";
import {Popover} from "antd";
import {useState} from "react";
import {Language, getLanguageName} from "@/utils/language/Language";
import style from "./style.module.scss"

interface LanguageSwitcherProps {
    type?: "default" | "compact",
    theme?: "default" | "secondary"
    customClass?: string;
}

export default function LanguageSwitcher(
    {type = "compact", customClass = '', theme = "default"}: LanguageSwitcherProps
) {

    const [open, setOpen] = useState(false)
    const {language, updateLanguage} = useContext(LanguageContext)!

    const mobile = type === "compact"

    function hide() {
        setOpen(false)
    }

    function handleOpenChange(newOpen: boolean) {
        setOpen(newOpen)
    }

    function onLanguageClick(language: Language) {
        updateLanguage(language)
        hide()
    }

    function popContent() {
        return (
            <div className={style.language}>
                <div onClick={() => onLanguageClick(Language.UA)}>
                    {
                        getLanguageName(Language.UA)
                    }
                </div>

                <div onClick={() => onLanguageClick(Language.RU)}>
                    {
                        getLanguageName(Language.RU)
                    }
                </div>

                <div onClick={() => onLanguageClick(Language.ENG)}>
                    {
                        getLanguageName(Language.ENG)
                    }
                </div>

                <div onClick={() => onLanguageClick(Language.DE)}>
                    {
                        getLanguageName(Language.DE)
                    }
                </div>
            </div>
        )
    }

    return (
        <Popover
            content={popContent}
            open={open}
            onOpenChange={handleOpenChange}
            trigger={"click"}
        >
            <div className={style.language_wrapper}>
                {
                    mobile ? (
                        <LanguageSwitcherCompact customClass={customClass} theme={theme} language={language}/>
                    ) : (
                        <LanguageSwitcherDefault customClass={customClass} language={language}/>
                    )
                }
            </div>
        </Popover>
    )
}