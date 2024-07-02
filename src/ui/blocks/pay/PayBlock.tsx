'use client'

import Button from "@/ui/components/button/Button";
import Image from "next/image";
import React from "react";
import style from "./style.module.scss"
import kids from "@/../public/img/payblockkids.webp"
import Copy from "@/../public/svg/ic_copy.svg"
import {useContext} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import {mainPageIds} from "@/utils/Const";

export default function PayBlock() {

    const {translations} = useContext(LanguageContext)!

    return (
        <div className={style.container} id={mainPageIds.donate}>
            <div className={style.header}>
                <h3>
                    {translations.pay.title}
                </h3>
                <p>
                    {translations.pay.info}
                </p>
            </div>
            <div className={style.info_container}>
                <Image alt={"image"} src={kids} priority className={style.image}/>
                <div className={style.info}>
                    <p>
                        {translations.pay.info2}
                    </p>
                    <ClickItem name={"Lorem ipsum"} value={"dolar sit apet consectute adipsicing"}/>
                    <div className={style.spacer}/>
                    <ClickItem name={"Lorem ipsum"} value={"UA 45 6346346 256135345 1234234256"}/>
                    <div className={style.spacer}/>
                    <ClickItem name={"Lorem ipsum"} value={"1455632135451"}/>
                    <div className={style.spacer}/>
                    <Button type={"outline_light"} text={"Copy information"} customStyle={style.button} onClick={() => {
                    }}/>
                </div>
            </div>
        </div>
    )
}

interface props {
    name: string,
    value: string,
}

function ClickItem({name, value}: props) {
    return (
        <div className={style.item_container}>
            <p>
                {name}
            </p>
            <div className={style.item}>
                <p>
                    {value}
                </p>
                <Copy className={style.item_copy}/>
            </div>
        </div>
    )
}