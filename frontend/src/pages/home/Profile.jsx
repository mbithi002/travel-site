import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdEdit } from "react-icons/md";

const Profile = () => {
    const { data: authUser } = useQuery({ queryKey: ['authUser'] })
    const queryClient = useQueryClient();
    const [toggleUpdate, setToggleUpdate] = useState(true)

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        fullName: '',
        oldPassword: '',
        newPassword: ''
    })

    const { mutate: logout, } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/auth/logout', {
                    method: 'POST',
                })

                const data = await res.data;
                if (!res.ok) {
                    throw new Error(data.message) || "something went wrong"
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: () => {
            toast.error("Failed to logout")
        }
    })

    const { mutate: updateProfile, isPending: isUpdating, isError, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/users/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error) || "something went wrong"
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            setToggleUpdate(!toggleUpdate)
            toast.success("New profile saved")
        }
    })
    useEffect(() => {
        if (authUser) {
            setFormData({
                email: authUser.email,
                username: authUser.username,
                fullName: authUser.fullName,
            });
        }
    }, [authUser]);


    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    {authUser && authUser.fullName}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[16rem] p-2 shadow text-neutral">
                    <form onSubmit={handleSubmit}>
                        <div onClick={() => setToggleUpdate(!toggleUpdate)} className="btn btn-primary w-full text-base-100 active:bg-blue-200">
                            <p className="">Edit profile</p>
                            <MdEdit />
                        </div>
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
                                readOnly={toggleUpdate}
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
                                readOnly={toggleUpdate}
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
                                readOnly={toggleUpdate}
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
                                readOnly={toggleUpdate}
                                type="password"
                                className="grow"
                                placeholder="old password"
                                name="oldPassword"
                                onChange={handleInputChange}
                                value={formData.oldPassword}
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
                                readOnly={toggleUpdate}
                                type="password"
                                className="grow"
                                placeholder="new password"
                                name="newPassword"
                                onChange={handleInputChange}
                                value={formData.newPassword}
                            />
                        </label>
                        {isError && <p className="text-red-500">{error.message}</p>}
                        <button disabled={toggleUpdate} className="btn btn-primary hover:bg-blue-300 text-base-100 my-2 transition-all duration-100 w-full mx-auto">
                            {isUpdating ? "saving..." : "Update"}
                        </button>
                    </form>
                    <li>
                        <div className="btn w-full hover:bg-red-400" onClick={(e) => {
                            e.preventDefault()
                            logout()
                        }}>Logout</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile