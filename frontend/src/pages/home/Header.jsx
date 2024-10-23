import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { BiLogOut } from "react-icons/bi";
import Spinner from '../../components/common/Spinner';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
    const { data: authUser, isLoading } = useQuery({ queryKey: ['authUser'] })
    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
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

    return (
        <div>
            <div className="navbar bg-base-100 text-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li><a>Destinations</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Travel</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Home</a></li>
                        <li><a>Destinations</a></li>
                        <li><a>About</a></li>
                        <li><a>contact</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                {
                    isLoading ? (
                        <div className="navbar-end flex">
                            <Spinner size='sm' bg='blue' />
                        </div>
                    ) : (
                        authUser && !isLoading ? (
                            <div className="navbar-end">
                                <div className="btn btn-primary">Profile</div>
                                <BiLogOut onClick={(e) => {
                                    e.preventDefault()
                                    logout()
                                }} className='w-5 m-3 hover:shadow-2xl h-5 cursor-pointer' />
                            </div>

                        ) : (
                            <div className="navbar-end">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-primary m-1">Login</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-70 p-2 shadow">
                                        <Login />
                                    </ul>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1">Signup</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-70 p-2 shadow">
                                        <Signup />
                                    </ul>
                                </div>
                            </div>)
                    )
                }

            </div>
        </div>
    )
}

export default Header