'use client'

import style from "./style.module.scss"
import CardInfo from "@/ui/components/card_info/CardInfo";
import ArrowIcon from "@/../public/svg/arrow_link.svg"
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import {mainPageIds} from "@/utils/Const";
import {useWindowSize} from "@/lib/hooks/useWindowSize";
import {useRouter} from "next/navigation";

export default function HistoryBlock() {

    const [open, setOpen] = useState(false)
    const {translations} = useContext(LanguageContext)!
    const [canShowMore, setCanShowMore] = useState(false)
    const {width} = useWindowSize()
    const router = useRouter()


    function toggleOpen() {
        setOpen(!open)
    }

    useEffect(() => {
        setCanShowMore(width <= 1800)
    }, [width]);

    return (
        <div className={style.container} id={mainPageIds.history}>
            <div className={style.header}>
                <h3>
                    {translations.history.title}
                </h3>
            </div>
            <div className={style.info}>
                <div className={`${style.block_text} ${open ? style.block_text_full : style.block_text_clip}`}>
                    {
                        (!open && canShowMore) && (
                            <div className={style.show_all_background}>
                                <p className={style.show_all_button} onClick={toggleOpen}>
                                    {translations.history.all}
                                </p>
                            </div>
                        )
                    }
                    <h4>
                        {translations.history.subtitle}
                    </h4>
                    <p>
                        {translations.history.text1}
                    </p>
                    <p>
                        {translations.history.text2}
                    </p>
                </div>
                <div className={style.block_card}>
                    <CardInfo title={"24"} text={translations.history.blocks.first} color={"green"}/>
                    <CardInfo title={"4"} text={translations.history.blocks.second} color={"purple"}/>
                    <CardInfo title={"35"} text={translations.history.blocks.third} color={"pink"}/>
                    <CardInfo title={"180"} text={translations.history.blocks.fourth} color={"peache"}/>
                    <CardInfo title={"10"} text={translations.history.blocks.fifth} color={"orange"}/>
                    <div className={style.card_project} onClick={() => {
                        router.push(`/#${mainPageIds.project.ready}`)
                    }}>
                        <div className={style.card_project_overlay}/>
                        <ArrowIcon className={style.card_project_icon}/>
                        <p className={style.card_project_text}>{translations.our_projects}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}