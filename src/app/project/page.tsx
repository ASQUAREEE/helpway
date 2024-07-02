"use client"
import Header from "@/ui/components/header/Header";
import styles from './page.module.scss'
import Image from "next/image";
import projectsMainImg2 from "../../../public/img/projectsMainImg2.png"
import Button from "@/ui/components/button/Button";
import Logo from "@/../public/svg/logo_white.svg"

import GalleryBlock from "@/ui/blocks/gallery/GalleryBlock";
import Footer_projects from "@/ui/components/footer_projects/footer_projects";
import { useClerk } from "@clerk/nextjs";


const urlsImg = [
    "https://placehold.co/600x400.png",
    "https://placehold.co/600x400.png",
    "https://placehold.co/600x400.png",  
]

 const Page = () => {
    const { user } = useClerk();
    const userId = user?.id;
  return (
      <>
          <Header />
          <div className={styles.container}>
              
              <div className={styles.head}>
                  <div className={styles.img_main}>
                      <Image src={projectsMainImg2} alt={"image"} width={330} />
                  </div>
                  <div className={styles.text_main}>
                      <div className={styles.text_main_content}>
                          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore </p>
                          <div className={styles.btn}>
                              <Button text="Donate" type="outline" onClick={() => { }} />
                          </div>
                      </div>

                  </div>
              </div>

              <div className={styles.header}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>

              <p className={styles.info}>Дитячі табори відкривають дітям двері до світу можливостей, де вони можуть реалізовувати свої плани, виявляти таланти та поглиблювати знання. Це літні та зимові пригоди в природі, що дарують дітям незабутні враження та розкривають перед ними нові горизонти пізнання світу. Протягом семи до десяти днів, діти не лише отримують можливість оволодіти новими навичками, але й розвивають таланти, формують дружні стосунки та навчаються `цінним життєвим навичкам.</p>
              <div style={{marginBottom: '48px'}}>
                  {/* <GalleryBlock urls={urlsImg}/> */}
                  <GalleryBlock userId={userId}/>
                  
              </div>
              <p className={styles.info}>Основною метою наших таборів є створення для дітей дружнього та сприятливого середовища, де вони можуть розвивати навички комунікації, творчості та самореалізації. Наші програми розроблені таким чином, щоб бути одночасно корисними для особистісного розвитку дітей захоплюючими. Ми створюємо найкращі умови для навчання та розваг, адже віримо, що навчання через ігри та пригоди - найкращий спосіб засвоїти нові знання та вмінняp</p>

              <div className={styles.header_center}>Lorem ipsum dolor sit amet</div>

              <p className={styles.info}>Основною метою наших таборів є створення для дітей дружнього та сприятливого середовища, де вони можуть розвивати навички комунікації, творчості та самореалізації. Наші програми розроблені таким чином, щоб бути одночасно корисними для особистісного розвитку дітей захоплюючими. Ми створюємо найкращі умови для навчання та розваг, адже віримо, що навчання через ігри та пригоди - найкращий спосіб засвоїти нові знання та вмінняp</p>

          </div>
          <Footer_projects />
      </>
  )
 }
export default Page;