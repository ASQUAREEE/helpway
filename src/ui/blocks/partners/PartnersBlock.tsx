'use client'

import style from "./style.module.scss"
import Button from "@/ui/components/button/Button";
import {mainPageIds} from "@/utils/Const";
import {useRouter} from 'next/navigation';
import {useContext} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";

export default function PartnersBlock() {

    const router = useRouter()

    const {translations} = useContext(LanguageContext)!

    return (
        <div className={style.container} id={mainPageIds.partners}>
            <div className={style.block}>
                <div className={style.info}>
                    <h3>
                        {translations.partners.title}
                    </h3>
                    <p>
                        {translations.partners.info}
                    </p>
                    <p>
                        {translations.partners.info1}
                    </p>
                    <p>
                        {translations.partners.info2}
                    </p>
                </div>
                <Button text={translations.partners.title} onClick={function (): void {
                    router.push("/partners")
                }}/>
            </div>
        </div>
    )
}