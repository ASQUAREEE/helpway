'use client'

import LanguageSwitcher from "@/ui/components/language_switcher/LanguageSwitcher";
import style from "./style.module.scss"
import Email from "@/../public/svg/email.svg"
import Logo from "@/../public/svg/logo_white.svg"
import Artevide from "@/../public/svg/artevide.svg"
import {mainPageIds} from "@/utils/Const";

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.info}>
                <div className={style.section_first}>
                    <Logo/>
                    <h2>
                        Давати охоче - значить більше ніж давати
                    </h2>
                    <div className={style.items}>
                        <a href={`/#${mainPageIds.main}`}>Головна</a>
                        <a href={`/#${mainPageIds.history}`}>Історія Фонду</a>
                        <a href={`/#${mainPageIds.mission}`}>Місія та Мета </a>
                        <a href={`/#${mainPageIds.work}`}>Наша методика роботи</a>
                        <a href={`/#${mainPageIds.project}`}>Наші проекти</a>
                        <a href={`/#${mainPageIds.main}`}>Пожертвування</a>
                        <a href={`/#${mainPageIds.gallery}`}>Галерея</a>
                        <a href={`/#${mainPageIds.partners}`}>Стати партером</a>
                    </div>
                    <div className={style.buttons}>
                        <div className={style.email_full}>
                            <Email fill={"#797979"}/>
                            <p>lorem_ipsum@gmail.com</p>
                        </div>
                        <LanguageSwitcher theme={"secondary"} type={"compact"}/>
                    </div>
                </div>
                <div className={style.section_second}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore
                        magna aliqua.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                    </p>
                </div>
            </div>
            <div className={style.promo}>
                <p>
                    Design & Dev:
                </p>
                <Artevide/>
            </div>
        </div>
    )
}