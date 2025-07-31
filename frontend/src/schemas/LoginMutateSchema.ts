import { z } from "zod";

export const loginMutateSchema = z.object({
    username: z
        .string()
        .min(2, { message: "This field has to be filled." })
        .max(32, { message: "the max of characters are 15" }),
    password: z
        .string()
        .min(3, { message: "This field has to be filled." })
        .max(32, { message: "the max of characters are 30" }),
});

export type LoginMutateSchema = z.infer<typeof loginMutateSchema>;

