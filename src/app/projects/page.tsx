"use client"

import Header from "@/ui/components/header/Header";
import styles from './page.module.scss'
import Image from "next/image";
import projectsMainImg from "../../../public/img/projectsMainImg.png"
import Button from "@/ui/components/button/Button";
import GalleryBlock from "@/ui/blocks/gallery/GalleryBlock";
import Footer_projects from "@/ui/components/footer_projects/footer_projects";
import { useClerk } from "@clerk/nextjs";

export default function Page() {
    const { user } = useClerk();
    const userId = user?.id;
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.head}>
                    <div className={styles.img_main}>
                        <Image src={projectsMainImg} alt={"image"} width={330} />
                    </div>
                    <div className={styles.text_main}>
                        <div className={styles.text_main_content}>
                            <h2>Дитячі табори</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            <div className={styles.btn}>
                                <Button text="Donate" onClick={() => { }} />
                                <Button text="Share" onClick={() => { }} />
                            </div>
                        </div>

                    </div>
                </div>
                <p className={styles.info}>Дитячі табори відкривають дітям двері до світу можливостей, де вони можуть реалізовувати свої плани, виявляти таланти та поглиблювати знання. Це літні та зимові пригоди в природі, що дарують дітям незабутні враження та розкривають перед ними нові горизонти пізнання світу. Протягом семи до десяти днів, діти не лише отримують можливість оволодіти новими навичками, але й розвивають таланти, формують дружні стосунки та навчаються цінним життєвим навичкам.</p>
                <p className={styles.info}>Основною метою наших таборів є створення для дітей дружнього та сприятливого середовища, де вони можуть розвивати навички комунікації, творчості та самореалізації. Наші програми розроблені таким чином, щоб бути одночасно корисними для особистісного розвитку дітей і захоплюючими. Ми створюємо найкращі умови для навчання та розваг, адже віримо, що навчання через ігри та пригоди - найкращий спосіб засвоїти нові знання та вміння.</p>

                <div>
                    <h2 className={styles.header}>Утримання та організація таборів потребують значних витрат, серед яких:</h2>
                    <ol>
                        <li>
                            <h4>Щоденне харчування:</h4>
                            <p>Забезпечення дітей здоровою та смачною їжею є однією із наших основних турбот. Діти отримують повноцінне харчування, яке відповідає їхнім потребам та вимогам.</p>
                        </li>
                        <li>
                            <h4>Забезпечення засобами гігієни:</h4>
                            <p>Забезпечення дітей здоровою та смачною їжею є однією із наших основних турбот. Діти отримують повноцінне харчування, яке відповідає їхнім потребам та вимогам.</p>
                        </li>
                        <li>
                            <h4>Оренда пансіонату:</h4>
                            <p>Забезпечення дітей здоровою та смачною їжею є однією із наших основних турбот. Діти отримують повноцінне харчування, яке відповідає їхнім потребам та вимогам.</p>
                        </li>
                        <li>
                            <h4>Транспорт та ліки</h4>
                            <p>Забезпечення дітей здоровою та смачною їжею є однією із наших основних турбот. Діти отримують повноцінне харчування, яке відповідає їхнім потребам та вимогам.</p>
                        </li>
                        <li>
                            <h4>Оплата додаткових послуг:</h4>
                            <p>Забезпечення дітей здоровою та смачною їжею є однією із наших основних турбот. Діти отримують повноцінне харчування, яке відповідає їхнім потребам та вимогам.</p>
                        </li>
                    </ol>
                </div>
                <div className={styles.resume}>Ваша підтримка допомагає нам створювати цінні спогади та можливості для дітей, які цього заслуговують.
                </div>
                <div className={styles.gallery}>
                <GalleryBlock userId={userId}/>
                </div>
            </div>
                <Footer_projects />
        </>


    )
}