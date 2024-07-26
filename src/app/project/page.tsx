"use client"
import Header from "@/ui/components/header/Header";
import styles from './page.module.scss'
import Image from "next/image";
import Button from "@/ui/components/button/Button";
import { Button as Shadcn } from "@/components/ui/button";
import GalleryBlock from "@/ui/blocks/gallery/GalleryBlock";
import Footer_projects from "@/ui/components/footer_projects/footer_projects";
import { useClerk } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/utils/language/LanguageContext";
import Footer from "@/ui/components/footer/Footer";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Page = () => {
    const { user } = useClerk();
    const userId = user?.id;
    const searchParams = useSearchParams();
    const name_eng = searchParams.get('name_eng');
    
    const [languageCode, setLanguageCode] = useState("ua");
    const { data: projectWithGallery, isPending, refetch } = name_eng ? trpc.project.getProjectWithGalleryById.useQuery({ name_eng: name_eng as string }) : { data: null, isPending: false, refetch: () => {} };
    const languageContext = useContext(LanguageContext);
    const {translations} = useContext(LanguageContext)!
    const language = languageContext?.language;
    const {toast} = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editedDonateText, setEditedDonateText] = useState({
        donateText_eng: "",
        donateText_ua: "",
        donateText_ru: "",
        donateText_de: "",
    });

    const editDonateTextMutation = trpc.project.editDonateText.useMutation({
        onSuccess: () => {
            refetch(); // Refetch the project data after successful mutation
            toast({
                title: "Success",
                description: "Donate text updated successfully",
                variant: "default",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to update donate text",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        if (projectWithGallery) {
            setEditedDonateText({
                donateText_eng: projectWithGallery.donateText_eng || "",
                donateText_ua: projectWithGallery.donateText_ua || "",
                donateText_ru: projectWithGallery.donateText_ru || "",
                donateText_de: projectWithGallery.donateText_de || "",
            });
        }
    }, [projectWithGallery]);

    const handleEditDonateText = async () => {
        if (!projectWithGallery) return;

        editDonateTextMutation.mutate({
            id: projectWithGallery.id,
            ...editedDonateText,
        });
        setIsDialogOpen(false);
    };

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

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (!projectWithGallery) {
        return <div>Project not found</div>;
    }

    const descriptionKey = `description_${languageCode}` as 'description_ua' | 'description_eng' | 'description_ru' | 'description_de';
    const description = projectWithGallery[descriptionKey];

    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Success',
            description: 'URL copied to clipboard!',
            variant: 'default',
            duration: 5000,
        });
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4 md:p-8 lg:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mt-16">
                    <div className="mb-4 md:mb-0 md:mr-8 w-full md:w-1/2 lg:w-1/3">
                        <Image src={projectWithGallery.imageUrl || "/default-image.png"} alt={"default"} width={330} height={200} className="w-full rounded-lg shadow-lg" />
                    </div>
                    <div className="text-center md:text-left w-full md:w-1/2 lg:w-2/3 bg-gray-100 rounded-lg p-6">
                        <div className="max-w-lg lg:max-w-2xl mx-auto md:mx-0">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-700">{projectWithGallery[`name_${languageCode}` as 'name_ua' | 'name_eng' | 'name_ru' | 'name_de']}</h1>
                            <div className="mt-4 flex items-center">
                                <p className="text-base md:text-lg text-gray-500 flex-grow">
                                    {editDonateTextMutation.isPending 
                                        ? "Updating..." 
                                        : projectWithGallery[`donateText_${languageCode}` as 'donateText_ua' | 'donateText_eng' | 'donateText_ru' | 'donateText_de']}
                                </p>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Shadcn variant="ghost" size="icon" className="ml-2">
                                            <Edit className="h-4 w-4" />
                                        </Shadcn>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Donate Text</DialogTitle>
                                        </DialogHeader>
                                        {Object.entries(editedDonateText).map(([key, value]) => (
                                            <div key={key} className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {key.replace('donateText_', '').toUpperCase()}
                                                </label>
                                                <Input
                                                    value={value}
                                                    onChange={(e) => setEditedDonateText(prev => ({ ...prev, [key]: e.target.value }))}
                                                    placeholder={`Enter donate text in ${key.replace('donateText_', '').toUpperCase()}`}
                                                />
                                            </div>
                                        ))}
                                        <Shadcn onClick={handleEditDonateText} disabled={editDonateTextMutation.isPending}>
                                            {editDonateTextMutation.isPending ? "Saving..." : "Save"}
                                        </Shadcn>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="flex justify-center md:justify-start mt-4">
                                <Link href="/#donate">
                                    <Button text={translations.donate} type="primary" onClick={() => { }} />
                                </Link>
                                <span className="ml-4">
                                    <Button text={translations.share} type="primary" onClick={handleShareClick} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <div className="max-w-full mx-auto">
                        <div className="mt-4 text-base md:text-lg text-gray-600">
                            {languageCode === 'eng' || languageCode === 'de' ? (
                                description?.split('\n').map((paragraph: string, index: number) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))
                            ) : (
                                <p>{description}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <GalleryBlock userId={userId} projectWithGallery={{ ...projectWithGallery, imageGallery: (projectWithGallery as any).imageGallery || [] }} />
                </div>
            </div>
            {/* <Footer_projects /> */}
            <Footer />
        </>
    );
}

export default Page;