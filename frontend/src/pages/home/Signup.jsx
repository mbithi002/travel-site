import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const Signup = () => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        fullName: '',
        password: ''
    })
    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullName, password }) => {
            try {
                const res = await fetch('/api/auth/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        fullName,
                        password,
                    }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error) || "Failed to create account";
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
            toast.success("account created successfully")
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData); // Pass formData as an object
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}><div className="p-3 text-center text-neutral">Signup</div>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="email"
                        className="grow"
                        placeholder="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Full Name"
                        name="fullName"
                        onChange={handleInputChange}
                        value={formData.fullName}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Username"
                        name="username"
                        onChange={handleInputChange}
                        value={formData.username}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </label>
                <button className="btn hover:bg-gray-600 transition-all duration-100 w-full mx-auto">
                    {isPending ? "Loading..." : "Sign up"}
                </button>
                {isError && <p className="text-red-500">{error.message}</p>}
            </form>
        </div>
    )
}

export default Signup