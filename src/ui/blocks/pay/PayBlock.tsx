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

    const copyInformation = () => {
        const info = `
            ${translations.account}: HELPWAY GGMBH I.GR.
            IBAN: DE04 7205 0000 0252 4807 36
            BIC: AUGSDE77XXX
        `;
        navigator.clipboard.writeText(info).then(() => {
            alert("Information copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

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
                    <ClickItem name={translations.account} value={"HELPWAY GGMBH I.GR."}/>
                    <div className={style.spacer}/>
                    <ClickItem name={"IBAN"} value={"DE04 7205 0000 0252 4807 36"}/>
                    <div className={style.spacer}/>
                    <ClickItem name={"BIC"} value={"AUGSDE77XXX"}/>
                    <div className={style.spacer}/>
                    <ClickItem name={"PayPal"} value={<a href="https://www.paypal.me/HelpWay" target="_blank" rel="noopener noreferrer">https://www.paypal.me/HelpWay</a>}/>
                    <div className={style.spacer}/>
                    <Button type={"outline_light"} text={"Copy information"} customStyle={style.button} onClick={copyInformation}/>
                </div>
            </div>
        </div>
    )
}

interface props {
    name: string,
    value: React.ReactNode, // Change from string to React.ReactNode
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