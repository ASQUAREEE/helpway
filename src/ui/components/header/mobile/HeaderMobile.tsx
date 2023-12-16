'use client'

import {MenuItem} from "@/ui/components/header/Header";
import LanguageSwitcher from "@/ui/components/language_switcher/LanguageSwitcher";
import style from "./style.module.scss"
import Menu from "@/../public/svg/menu.svg"
import {Drawer} from "antd";
import Logo from "@/../public/svg/logo_black.svg"

function MenuItem({name, link, subItems = []}: MenuItem) {
    if (subItems?.length > 0) {
        return (
            <div className={style.submenu_header}>
                <p>{name}</p>
                {
                    subItems.map((item) => (
                        <a href={`/#${item.link}`} key={item.link} className={style.submenu_item}>
                            {item.name}
                        </a>
                    ))
                }
            </div>
        )
    } else {
        return (
            <a href={`/#${link}`} className={style.menu_item}>
                {name}
            </a>
        )
    }
}

export default function HeaderMobile(menuItems: MenuItem[], onClose: () => void, onOpen: () => void, openDrawer: boolean) {


    return (
        <div>
            <div className={style.container}>
                <Menu onClick={onOpen}/>
                <LanguageSwitcher type={"compact"}/>
            </div>
            <Drawer
                placement="left"
                size={"default"}
                onClose={onClose}
                open={openDrawer}>
                <div className={style.menu}>
                    <div className={style.logo}>
                        <Logo/>
                    </div>
                    {
                        menuItems.map((item) => (
                            <MenuItem key={item.link} link={item.link} name={item.name} subItems={item.subItems}/>
                        ))
                    }
                </div>
            </Drawer>
        </div>

    )
}