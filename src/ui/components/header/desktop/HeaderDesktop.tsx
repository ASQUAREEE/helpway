'use client'

import {type MenuItem} from "@/ui/components/header/Header";
import style from "./style.module.scss"
import Logo from "@/../public/svg/logo_black.svg"
import Arrow from "@/../public/svg/arrow_drop_down.svg"
import Email from "@/../public/svg/email.svg"
import Button1 from "@/ui/components/button/Button";
import {Popover} from "antd";
import LanguageSwitcher from "@/ui/components/language_switcher/LanguageSwitcher";
import {useContext, useState} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import ButtonIcon from "@/ui/components/button_icon/ButtonIcon";
import {email, mainPageIds} from "@/utils/Const";
import {useRouter} from "next/navigation";
import { SignInButton, SignOutButton, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MenuItem({name, link, subItems = []}: MenuItem ) {

    const content = subItems?.length > 0 ?
        (
            <div>
                {/* {
                    subItems.map((item) => (
                        <a href={`/#${item.link}`} key={item.name} onClick={() => {
                        }} className={style.submenu_item}>
                            {item.name}
                        </a>
                    ))
                } */}
            </div>
        ) : undefined

    return (
        <a href={link === "2" ? `/#projects` : `/#${link}`} className={style.menu_item}>
        {name}
    </a>
    )
}

interface MailButtonProps {
    shortEmail: boolean,
}

function MailButton({shortEmail}: MailButtonProps) {

    const [isMailMessageShow, setMailMessageShow] = useState(false);

    const content = (
        <div>
            <p>
                Почта скопирована
            </p>
        </div>
    )

    function onMainClick() {
        setMailMessageShow(true);
        navigator.clipboard.writeText(email)
        setTimeout(() => {
            setMailMessageShow(false);
        }, 600);
    }

    const handleOpenChange = (newOpen: boolean) => {
        setMailMessageShow(newOpen);
    };

    return (
        <Popover
            open={isMailMessageShow}
            onOpenChange={handleOpenChange}
            content={content}
            trigger={"click"}
        >
            {
                shortEmail ? (
                    <ButtonIcon icon={(<Email fill={"#000"}/>)} onButtonClick={ () => {
                        onMainClick()
                    }} customClass={style.email}/>
                ) : (
                    <div className={style.email_full} onClick={() => {
                        onMainClick()
                    }}>
                        <Email fill={"#000"}/>
                        <p>{email}</p>
                    </div>
                )
            }
        </Popover>
    )
}


export default function HeaderDesktop(menuItems: MenuItem[], shortEmail: boolean, shortLanguage: boolean) {

    const {translations} = useContext(LanguageContext)!
    const router = useRouter()
    const { user } = useClerk();
    const languageButtonType = shortLanguage ? "compact" : "default"

    const onDonateClick = () => {
        router.push(`/#${mainPageIds.donate}`)
    }

    return (
        <div className={style.container}>
            <div className={style.information}>
                <div className={style.menu}>
                    <Logo className={style.logo} onClick={() => {
                        router.push(`/#${mainPageIds.main}`)
                    }}/>
                    {
                        menuItems.map((item) => (
                            <MenuItem link={item.link} name={item.name} subItems={item.subItems} key={item.link} />
                        ))
                    }
                </div>
            </div>
            <div className={style.actions}>
                <MailButton shortEmail={shortEmail}/>
                <LanguageSwitcher type={languageButtonType} customClass={style.language}/>
                <Button1 text={translations.header_actions.donate} onClick={onDonateClick}/>
            </div>
        </div>
    )
}