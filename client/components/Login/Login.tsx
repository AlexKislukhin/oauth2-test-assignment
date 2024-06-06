"use client";

import { useLogin } from "@/api/mutations/useLogin";
import { useForm } from "react-hook-form";
import { Loader } from "../Loader/Loader";

interface IFormValues {
    username: string;
    password: string;
}

export const Login = () => {
    const { register, handleSubmit } = useForm<IFormValues>();

    const { mutateAsync: login, isPending, isError, error } = useLogin();

    const onSubmit = handleSubmit(async (creds) => {
        await login(creds);
    });

    return (
        <div className="relative p-12">
            {isPending && <Loader />}
            {isError && <div>{error.message}</div>}
            <form onSubmit={onSubmit} className="flex flex-col">
                <label>Username</label>
                <input {...register("username")} />
                <label>Password</label>
                <input {...register("password")} type="password" />
                <button type="submit">submit</button>
            </form>
        </div>
    );
};
