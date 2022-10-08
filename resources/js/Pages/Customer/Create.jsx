import React, { useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admins.store"));
    };
    console.log(errors);
    return (
        <>
        
            <Head title="Create Admin" />
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={submit}>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Name
                        </span>
                        <span class="text-gray-700 dark:text-gray-400">
                            Name
                        </span>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Email
                        </span>
                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="email"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Mobile
                        </span>
                        <Input
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="phone"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Password
                        </span>
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Confirm Password
                        </span>
                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <Button
                        className="bg-purple-500 text-white px-8 py-2 
                        rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900 transition-all hover:-translate-y-1"
                        processing={processing}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </>
    );
}
