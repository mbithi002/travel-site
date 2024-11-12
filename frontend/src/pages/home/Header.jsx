import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

const Header = () => {
    const { data: authUser, isLoading } = useQuery({ queryKey: ['authUser'] })

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
                            <li>
                                <Link to={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/destinations'}>
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link to={'/about'}>
                                    About
                                </Link>
                            </li>
                            {
                                authUser?.role === 'admin' && (
                                    <li>
                                        <Link to={'/admin'}>
                                            Admin
                                        </Link>
                                    </li>
                                )
                            }
                            {
                                authUser && <li>
                                    <Link to={'/bookings'}>
                                        My bookings
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                    <Link to={'/'}>
                        <a className="btn btn-ghost text-xl">Travel</a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/destinations'}>
                                Destinations
                            </Link>
                        </li>
                        <li>
                            <Link to={'/about'}>
                                About
                            </Link>
                        </li>
                        {
                            authUser?.role === 'admin' && (
                                <li>
                                    <Link to={'/admin'}>
                                        Admin
                                    </Link>
                                </li>
                            )
                        }
                        {
                            authUser && <li>
                                <Link to={'/bookings'}>
                                    My bookings
                                </Link>
                            </li>
                        }
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
                                <Profile />
                            </div>

                        ) : (
                            <div className="navbar-end">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-primary m-1 text-base-100">Login</div>
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