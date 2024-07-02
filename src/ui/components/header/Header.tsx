'use client'

import style from "./style.module.scss"
import {useWindowSize} from "@/lib/hooks/useWindowSize";
import HeaderMobile from "./mobile/HeaderMobile";
import HeaderDesktop from "./desktop/HeaderDesktop";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import {mainPageIds} from "@/utils/Const";

export interface MenuItem {
    name: string,
    link: string,
    subItems?: MenuItem[]
}

export default function Header() {

    const {translations} = useContext(LanguageContext)!

    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false);
    const [isShortLanguage, setIsShortLanguage] = useState(false)
    const [isShortEmail, setIsShortEmail] = useState(false)
    const {width} = useWindowSize()
    const mobileWidth = 1400
    const shortLanguageWidth = 1750
    const shortEmailWidth = 1640

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setIsMobile(width <= mobileWidth)
        setIsShortLanguage(width <= shortLanguageWidth)
        setIsShortEmail(width <= shortEmailWidth)
    }, [width]);

    const menuItems: MenuItem[] = [
        {
            name: translations.header_menu.history.name,
            link: "1",
            subItems: [
                {
                    name: translations.header_menu.history.submenu.history,
                    link: mainPageIds.history
                },
                {
                    name: translations.header_menu.history.submenu.mission,
                    link: mainPageIds.mission
                },
                {
                    name: translations.header_menu.history.submenu.methods,
                    link: mainPageIds.work
                }
            ]
        },
        {
            name: translations.header_menu.projects.name,
            link: "2",
            subItems: [
                {
                    name: translations.header_menu.projects.submenu.ready,
                    link: "1"
                },
                {
                    name: translations.header_menu.projects.submenu.current,
                    link: "2"
                },
                {
                    name: translations.header_menu.projects.submenu.regular,
                    link: "3"
                }
            ]
        },
        {
            name: translations.header_menu.partner,
            link: mainPageIds.partners
        },
        {
            name: translations.header_menu.gallery,
            link: mainPageIds.gallery
        }
    ]

    return (
        <header className={style.header}>
            {
                !isMobile ? HeaderDesktop(menuItems, isShortEmail, isShortLanguage) : HeaderMobile(menuItems, onClose, showDrawer, open)
            }
            <div className={style.divider}/>
        </header>
    )

}