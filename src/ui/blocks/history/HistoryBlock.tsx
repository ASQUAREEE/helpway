'use client'

import Button from "@/ui/components/button/Button";
import style from "./style.module.scss"
import CardInfo from "@/ui/components/card_info/CardInfo";
import ArrowIcon from "@/../public/svg/arrow_link.svg"
import {useContext, useState} from "react";
import {LanguageContext} from "@/utils/language/LanguageContext";
import {mainPageIds} from "@/utils/Const";

export default function HistoryBlock() {

    const [open, setOpen] = useState(false)
    const {translations} = useContext(LanguageContext)!

    function toggleOpen() {
        setOpen(!open)
    }

    return (
        <div className={style.container} id={mainPageIds.history}>
            <div className={style.header}>
                <h3>
                    {translations.history.title}
                </h3>
                <Button text={"Дивитись галерею"} type={"outline"} onClick={() => {
                }}/>
            </div>
            <div className={style.info}>
                <div className={`${style.block_text} ${open ? style.block_text_full : style.block_text_clip}`}>
                    {
                        !open && (
                            <div className={style.show_all_background}>
                                <p className={style.show_all_button} onClick={toggleOpen}>
                                    Відкрити повністю
                                </p>
                            </div>
                        )
                    }
                    <h4>
                        2010 рік був початком нашої спільної праці в реалізації проектів допомоги дітям сиротам
                    </h4>
                    <p>
                        Саме тоді ми створили фонд, який присвятив свою діяльність підтримці цих дітей на їх життєвому
                        шляху та забезпечення хорошого дитинства. З того часу ми впровадили багато проєктів, щоб зробити
                        життя дітей яскравішим та кращим. Протягом цих років, ми провели не менше ніж 24 дитячих
                        таборів, де налічувалось від 100 до 180 дітей в кожному таборі.
                    </p>
                    <p>
                        Ми віримо, що саме в таких заходах діти можуть знайти нових друзів, отримати додаткові знання та
                        розвинути свої таланти. Це незабутні пригоди та нове середовище для сотень дітей, які долучались
                        до наших програм. В кожному таборі, вони отримували можливість навчатися, розвиватися,
                        комунікувати та отримувати найкращий досвід дитинства. На завершення таборів, протягом останніх
                        4 років діти отримують на згадку улюблений журнал "Твій шлях”, який ми разом із командою
                        випускаємо кожні півроку для збереження спогадів та підсумку результатів таборів. Цей журнал є
                        вікном до світу досягнень та подорожі наших учасників, і ми пишаємося, що можемо зберегти цю
                        історію.
                    </p>
                    <p>
                        Крім того, постійною увагою нашої організації є близько 10 інтернатів в Україні, яким ми
                        допомагаємо на постійній основі щотижня.
                    </p>
                    <p>
                        Наш успіх - це також заслуга наших 35 штатних волонтерів, які працюють над кожним проєктом із
                        великим прагненням та відданістю.
                    </p>
                    <p>
                        Нам приємно об'єднати зусилля та спільно втілити значущі ініціативи, спрямовані на полегшення
                        долі дітей, які переживають непросте дитинство.
                    </p>
                </div>
                <div className={style.block_card}>
                    <CardInfo title={"24"} text={"організованих дитячих таборів"} color={"green"}/>
                    <CardInfo title={"4"} text={"роки організованих дитячих таборів"} color={"purple"}/>
                    <CardInfo title={"35"} text={"штатних волонтерів"} color={"pink"}/>
                    <CardInfo title={"180+"} text={"дітей обʼєднанихв таборі"} color={"peache"}/>
                    <CardInfo title={"10"} text={"Постійна підтримкаінтернатів по Україні"} color={"orange"}/>
                    <div className={style.card_project}>
                        <div className={style.card_project_overlay}/>
                        <ArrowIcon className={style.card_project_icon}/>
                        <p className={style.card_project_text}>{translations.our_projects}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}