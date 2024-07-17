import { z } from "zod";
import { procedure, router } from "../trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({

    getUser: procedure.input(z.object({
        id: z.string().optional(),
    })).mutation(({ input }) => {
        const user = prisma.user.findUnique({
            where: {
                id: input.id,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    }),

    getAllUsers: procedure.query(async () => {
        return await prisma.user.findMany();
    }),

    createUserIfNotExists: procedure
    .input(z.object({ id: z.string(), email: z.string()}))
      .mutation(async ({ ctx, input: {id,email} }) => {
  
          const potentialUser = await prisma.user.findUnique({
              where: { email },
          });
  
        if (!potentialUser) {
  
        return (
          await prisma.user.create({
          data: {
            id,
            email,
          },
        })
      )
      
      }
      }),

      updateUserRole: procedure.input(z.object({
        id: z.string(),
        role: z.string(),
      })).mutation(async ({ ctx, input: {id,role} }) => {
        return await prisma.user.update({
          where: { id },
          data: { role },
        })
      }),

});
