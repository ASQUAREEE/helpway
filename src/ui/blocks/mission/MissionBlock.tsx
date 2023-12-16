'use client'

import style from './style.module.scss'
import Contacts from "@/../public/svg/contacts.svg"
import FacePlus from "@/../public/svg/face_plus.svg"
import House from "@/../public/svg/roofing.svg"
import Book from "@/../public/svg/menu_book.svg"
import Favourite from "@/../public/svg/favorite_border.svg"
import Face from "@/../public/svg/face.svg"
import {ReactElement, useContext, useEffect, useState} from 'react';
import MissionBlockDesctop from "@/ui/blocks/mission/desktop/MissionBlockDesctop";
import {useWindowSize} from '@/lib/hooks/useWindowSize';
import MissionBlockMobile from "@/ui/blocks/mission/mobile/MissionBlockMobile";
import {LanguageContext} from '@/utils/language/LanguageContext'
import {mainPageIds} from "@/utils/Const";

export interface MissionBlockItem {
    icon: ReactElement,
    text: string,
    color: string
}


export default function MissionBlock() {

    const [isMobile, setIsMobile] = useState(false)
    const {translations} = useContext(LanguageContext)!
    const {width} = useWindowSize()
    const mobileWidth = 650

    useEffect(() => {
        setIsMobile(width <= mobileWidth)
    }, [width]);

    const items: MissionBlockItem[] = [
        {
            icon: <Contacts/>,
            color: "#FFE5E5",
            text: translations.mission.items.first
        },
        {
            icon: <FacePlus/>,
            color: "#D4FFD9",
            text: translations.mission.items.second
        },
        {
            icon: <House/>,
            color: "#DBD8FF",
            text: translations.mission.items.third
        },
        {
            icon: <Book/>,
            color: "#FFBFDE",
            text: translations.mission.items.fourth
        },
        {
            icon: <Favourite/>,
            color: "#FFFBD8",
            text: translations.mission.items.fifth
        },
        {
            icon: <Face/>,
            color: "#FFD2ED",
            text: translations.mission.items.six
        }
    ]

    return (
        <div className={style.container} id={mainPageIds.mission}>
            <h3>
                {translations.mission.title}
            </h3>
            {
                !isMobile ? MissionBlockDesctop(items) : MissionBlockMobile(items)
            }
        </div>
    )
}