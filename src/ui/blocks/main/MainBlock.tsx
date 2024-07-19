'use client'

import style from './style.module.scss'
import {useWindowSize} from "@/lib/hooks/useWindowSize";
import {useContext, useEffect, useState} from "react";
import Button from '@/ui/components/button/Button';
import Image from "next/image";
import Logo from "@/../public/svg/logo_black.svg"
import FirstImage from "@/../public/img/mainblockfirstimg1.jpg"
import SecondImage from "@/../public/img/second.jpg"
import ArrowIcon from "@/../public/svg/arrow_link.svg"
import {LanguageContext} from '@/utils/language/LanguageContext';
import {mainPageIds} from "@/utils/Const";
import {useRouter} from "next/navigation";
import Link from 'next/link';

export function MainBlock() {

    const [isMobile, setIsMobile] = useState(false)
    const {width} = useWindowSize()
    const {translations} = useContext(LanguageContext)!
    const mobileWidth = 1000
    const container = isMobile ? style.container_mobile : style.container_desktop
    const router = useRouter()

    useEffect(() => {
        setIsMobile(width <= mobileWidth)
    }, [width]);

    function onDonateClick() {
        router.push(`/#${mainPageIds.donate}`)
    }

    return (
        <div className={container} id={mainPageIds.main}>

            <div className={style.information}>
                <h1>{translations.main.title}</h1>
                <h3>{translations.main.subtitle}</h3>
                <Button text={translations.donate} onClick={onDonateClick}/>
            </div>
            <div className={style.grid_container}>
                <Image alt={"image"} src={FirstImage} priority className={style.item_fist}/>
                <div className={style.item_second} onClick={() => {
                    router.push(`/#${mainPageIds.project.ready}`)
                }}>
                    <div className={style.project_overlay}/>
                    <ArrowIcon className={style.project_icon}/>
                    <p className={style.project_text}>{translations.our_projects}</p>
                </div>
                <Image alt={"image"} src={SecondImage} priority className={style.item_third}/>
            </div>

            {
                isMobile && (
                    <div className={style.logo}>
                        <Link href="/">
                            <Logo/>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}