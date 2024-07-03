"use client"
import Header from "@/ui/components/header/Header";
import styles from './page.module.scss'
import Image from "next/image";
import Button from "@/ui/components/button/Button";
import GalleryBlock from "@/ui/blocks/gallery/GalleryBlock";
import Footer_projects from "@/ui/components/footer_projects/footer_projects";
import { useClerk } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/utils/language/LanguageContext";

const Page = () => {
    const { user } = useClerk();
    const userId = user?.id;
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const [languageCode, setLanguageCode] = useState("ua");
    const { data: projectWithGallery, isLoading } = projectId ? trpc.project.getProjectWithGalleryById.useQuery({ id: projectId as string }) : { data: null, isLoading: false };
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language;

    useEffect(() => {
        switch (language) {
            case 0:
                setLanguageCode("ua");
                break;
            case 1:
                setLanguageCode("eng");
                break;
            case 2:
                setLanguageCode("ru");
                break;
            case 3:
                setLanguageCode("de");
                break;
            default:
                setLanguageCode("eng");
                break;
        }
    }, [language])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!projectWithGallery) {
        return <div>Project not found</div>;
    }

    return (
        <>
        <Header />
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mt-16">
                <div className="mb-4 md:mb-0 md:mr-8 w-full md:w-1/2 lg:w-1/3">
                    <Image src={projectWithGallery.imageUrl || "/default-image.png"} alt={"default"} width={330} height={200} className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="text-center md:text-left w-full md:w-1/2 lg:w-2/3">
                    <div className="max-w-lg lg:max-w-2xl mx-auto md:mx-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{projectWithGallery[`name_${languageCode}` as 'name_ua' | 'name_eng' | 'name_ru' | 'name_de']}</h1>
                        <p className="mt-4 text-base md:text-lg text-gray-600">{projectWithGallery[`description_${languageCode}` as 'description_ua' | 'description_eng' | 'description_ru' | 'description_de']}</p>
                        <div className={styles.btn}>
                                <Button text="Donate" type="outline" onClick={() => { }} />
                            </div>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <GalleryBlock userId={userId} projectWithGallery={projectWithGallery} />
            </div>
        </div>
        <Footer_projects />
    </>
    );
}

export default Page;