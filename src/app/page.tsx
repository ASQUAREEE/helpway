"use client"

import Header from '@/ui/components/header/Header'
import styles from './page.module.css'
import {MainBlock} from "@/ui/blocks/main/MainBlock";
import PartnersBlock from '@/ui/blocks/partners/PartnersBlock';
import HowDoWorkBlock from "@/ui/blocks/how_do_work/HowDoWorkBlock";
import MissionBlock from "@/ui/blocks/mission/MissionBlock";
import ProjectsBlock from "@/ui/blocks/projects/ProjectsBlock";
import Footer from '@/ui/components/footer/Footer';
import { trpc } from '@/server/client';
import { NextPage } from 'next';
import { useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import HistoryBlock from '@/ui/blocks/history/HistoryBlock';
import PayBlock from '@/ui/blocks/pay/PayBlock';
import GalleryBlock from '@/ui/blocks/homePageGallery/GalleryBlock';

const Home: NextPage = () => {

  const { user } = useClerk();

  const createUserIfNotExists = trpc.user.createUserIfNotExists.useMutation();

  useEffect(() => {
    if (user && user.id) {
      createUserIfNotExists.mutate({ id: user.id, email: user.emailAddresses[0].emailAddress });
    }
  }, [user]);


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Header />
                <MainBlock/>
                <HistoryBlock/>
                <MissionBlock/>
                <HowDoWorkBlock/>
                <ProjectsBlock userId={user?.id} />
                <PayBlock/>
                <GalleryBlock userId={user?.id} isHeader/>
                <PartnersBlock/>
                <Footer/>
            </div>
        </main>
    )
    
}


export default Home;


// try {
//   await uploadToVercelBlob(file, (url) => {
//     if (url) {
//       setProfilePic(url);
//       form.setValue("profilePic", url);
//     } else {
//       console.error("Upload returned a null URL");
//     }
//   });
// } catch (error) {
//   console.error("Upload error:", error);
// } 

// await removeVercelBlob(fileToRemove.url, (blob) => {
//   if (blob === null) {
//       deleteKnowledgeBaseFile.mutateAsync({ fileId: fileToRemove.id }).then(() => {
//           toast({
//               title: 'Success',
//               description: 'File removed successfully.',
//               variant: 'default',
//           });
//       }).catch((error) => {
//           toast({
//               title: 'Error',
//               description: `Failed to remove file: ${(error as Error).message}`,
//               variant: 'destructive',
//           });
//       });
//   } else {
//       toast({
//           title: 'Error',
//           description: 'Failed to remove file from Vercel Blob',
//           variant: 'destructive',
//       });
//   }
// });