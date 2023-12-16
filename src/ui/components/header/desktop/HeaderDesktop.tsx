'use client'

import {MenuItem} from "@/ui/components/header/Header";
import style from "./style.module.scss"
import Logo from "@/../public/svg/logo_black.svg"
import Arrow from "@/../public/svg/arrow_drop_down.svg"
import Email from "@/../public/svg/email.svg"
import Button from "@/ui/components/button/Button";
import {Popover} from "antd";
import LanguageSwitcher from "@/ui/components/language_switcher/LanguageSwitcher";
import {useContext} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import ButtonIcon from "@/ui/components/button_icon/ButtonIcon";

function MenuItem({name, link, subItems = []}: MenuItem) {
    const content = subItems?.length > 0 ?
        (
            <div>
                {
                    subItems.map((item) => (
                        <a href={`/#${item.link}`} key={item.link} className={style.submenu_item}>
                            {item.name}
                        </a>
                    ))
                }
            </div>
        ) : undefined

    return (
        <Popover
            content={content}
            trigger={"hover"}
        >
            <a href={`/#${link}`} className={style.menu_item}>
                {name}
                {
                    subItems?.length > 0 && (<Arrow className={style.menu_item_arrow}/>)
                }
            </a>
        </Popover>
    )
}

interface MailButtonProps {
    shortEmail: boolean,
}

function MailButton({shortEmail}: MailButtonProps) {
    if (shortEmail) {
        return (
            <ButtonIcon icon={(<Email fill={"#000"}/>)} onClick={() => {
            }} customClass={style.email}/>
        )
    } else {
        return (
            <div className={style.email_full}>
                <Email fill={"#000"}/>
                <p>lorem_ipsum@gmail.com</p>
            </div>
        )
    }
}


export default function HeaderDesktop(menuItems: MenuItem[], shortEmail: boolean, shortLanguage: boolean) {

    const {translations} = useContext(LanguageContext)!

    const languageButtonType = shortLanguage ? "compact" : "default"

    function onDonateClick() {

    }

    return (
        <div className={style.container}>
            <div className={style.information}>
                <div className={style.menu}>
                    <Logo className={style.logo}/>
                    {
                        menuItems.map((item) => (
                            <MenuItem link={item.link} name={item.name} subItems={item.subItems} key={item.link}/>
                        ))
                    }
                </div>
            </div>
            <div className={style.actions}>
                <MailButton shortEmail={shortEmail}/>
                <LanguageSwitcher type={languageButtonType} customClass={style.language}/>
                <Button text={translations.header_actions.donate} onClick={onDonateClick}/>
            </div>
        </div>
    )
}