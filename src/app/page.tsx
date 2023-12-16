import Header from '@/ui/components/header/Header'
import styles from './page.module.css'
import {MainBlock} from "@/ui/blocks/main/MainBlock";
import PartnersBlock from '@/ui/blocks/partners/PartnersBlock';
import HistoryBlock from "@/ui/blocks/history/HistoryBlock";
import HowDoWorkBlock from "@/ui/blocks/how_do_work/HowDoWorkBlock";
import MissionBlock from "@/ui/blocks/mission/MissionBlock";
import ProjectsBlock from "@/ui/blocks/projects/ProjectsBlock";
import Footer from '@/ui/components/footer/Footer';
import GalleryBlock from "@/ui/blocks/gallery/GalleryBlock";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Header/>
                <MainBlock/>
                <HistoryBlock/>
                <MissionBlock/>
                <HowDoWorkBlock/>
                <ProjectsBlock/>
                <PartnersBlock/>
                <GalleryBlock/>
                <Footer/>
            </div>
        </main>
    )
}
