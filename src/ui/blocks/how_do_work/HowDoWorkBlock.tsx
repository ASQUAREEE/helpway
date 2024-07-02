'use client'

import style from "./style.module.scss"
import {mainPageIds} from "@/utils/Const";
import {Carousel} from "antd";
import {useContext} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";

export default function HowDoWorkBlock() {

    const {translations} = useContext(LanguageContext)!

    const blocks = [
        translations.work.first,
        translations.work.second,
        translations.work.third,
        translations.work.fourth,
        translations.work.fifth
    ]

    return (
        <div className={style.container} id={mainPageIds.work}>
            <div className={style.block}>
                <h3>
                    {translations.work.title}
                </h3>
                <div className={style.grid}>
                    {
                        blocks.map((item, index) => (
                            <div key={index} className={style.grid_item}>
                                <p className={style.grid_item_index}>
                                    {index + 1}.
                                </p>
                                <p className={style.grid_item_text}>
                                    {item}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}