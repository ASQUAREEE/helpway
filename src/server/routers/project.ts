import { z } from "zod";
import { procedure, router } from "../trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const projectRouter = router({

    getProject: procedure.query(async () => {
        return await prisma.project.findMany();
    }),

    createProject: procedure
    .input(z.object({ userId: z.string(), name: z.string(), description: z.string(), imageUrl: z.string(), projectLink: z.string()}))
      .mutation(async ({ ctx, input: {userId,name,description,imageUrl,projectLink} }) => {
        return (
          await prisma.project.create({
          data: {
            name,
            description,
            imageUrl,
            projectLink,
            userId,
          },
        })
      )
      
      }),

      deleteProject: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        return await prisma.project.delete({
          where: {
            id,
          },
        });
      }),

      getGallery: procedure.query(async () => {
        return await prisma.imageGallery.findMany();
    }),

      createGallery: procedure.input(z.object({ userId: z.string(), imageUrl: z.string() })).mutation(async ({ ctx, input: { userId, imageUrl } }) => {
        return await prisma.imageGallery.create({
          data: {
            imageUrl,
            userId,
          },
        });
      }),

      deleteGallery: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        return await prisma.imageGallery.delete({
          where: {
            id,
          },
        });
      }),



});
