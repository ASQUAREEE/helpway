'use client'

import style from "./style.module.scss"
import Email from "@/../public/svg/email.svg"
import Telegram from "@/../public/svg/ic_telegram.svg"
import Instagram from "@/../public/svg/ic_instagram.svg"
import Behance from "@/../public/svg/ic_behance.svg"
import Logo from "@/../public/svg/logo_white.svg"
import Artevide from "@/../public/svg/artevide.svg"

export default function Footer_projects() {

    return (
        <div className={style.container}>
            <div className={style.logo}>
                        <Logo />
                    </div>
            <div className={style.container_inner}>
                <div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className={style.social}>
                        <div className={style.icons}>
                            <div><Telegram fill={"#797979"} /></div>
                            <div><Instagram fill={"#797979"} /></div>
                            <div><Behance fill={"#797979"} /></div>
                        </div>

                        <div className={style.email}>
                            <div className={style.email_text}>Lopem_ipsum@gmail.com</div>
                            <div><Email fill={"#797979"} /></div>

                        </div>
                    </div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div>
                        <div className={style.block}>
                            <div className={style.block1}>Lorem ipsum</div>
                            <div className={style.block2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </div>
                        <div className={style.block}>
                            <div className={style.block1}>Lorem ipsum</div>
                            <div className={style.block2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </div>
                        <div className={style.block}>
                            <div className={style.block1}>Lorem ipsum</div>
                            <div className={style.block2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </div>

                    </div>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div>
                        <div className={style.block}>
                            <div className={style.block1}>Lorem ipsum</div>
                            <div className={style.block2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </div>
                        <div className={style.block}>
                            <div className={style.block1}>Lorem ipsum</div>
                            <div className={style.block2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </div>

                    </div>
                </div>

            </div>
            <div className={style.promo}>
                <p>
                    Design & Dev:
                </p>
                <Artevide />
            </div>
        </div>
    )
}