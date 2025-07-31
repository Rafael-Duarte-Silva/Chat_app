"use client";

import { LoginData } from "@/interfaces/LoginData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    loginMutateSchema,
    LoginMutateSchema,
} from "@/schemas/LoginMutateSchema";

import { postUserLogin } from "./LoginAPI";

export default function Login() {
    const router = useRouter();
    const { mutate } = useMutation({
        mutationFn: postUserLogin,
        retry: 2,
        onSuccess: () => {
            router.push("/");
        },
    });

    const { register, handleSubmit } = useForm<LoginMutateSchema>({
        resolver: zodResolver(loginMutateSchema),
        mode: "onBlur",
    });

    const handleSendLoginData: SubmitHandler<LoginMutateSchema> = (
        data: LoginData,
    ) => {
        mutate(data);
    };

    return (
        <div className="Login">
            <form
                className="Login-wrap"
                onSubmit={handleSubmit(handleSendLoginData)}
            >
                <h1>login</h1>

                <input
                    {...register("username")}
                    id="usernameInput"
                    autoComplete="name"
                    placeholder="admin"
                    type="text"
                />
                <input
                    {...register("password")}
                    id="passwordInput"
                    autoComplete="current-password"
                    placeholder="********"
                    type="password"
                />
                <button
                    className="Login-button"
                    type="submit"
                >
                    login
                </button>
            </form>
        </div>
    );
}

