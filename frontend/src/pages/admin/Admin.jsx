import React, { useState } from 'react'
import Destinations from './Destinations'
import Users from './Users'

const Admin = () => {
    const [content, setContent] = useState('users')
    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="text-neutral">
                    <div className="dropdown shadow-2xl">
                        <div tabIndex={0} role="button">
                            <button className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-5 w-5 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li onClick={() => setContent('users')} ><a>users</a></li>
                            <li onClick={() => setContent('destinations')}><a>Destinations</a></li>
                        </ul>
                    </div>
                </div>
                <p className="text-neutral text-xl font-bold">{content}</p>
                <div className="text-neutral">
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {content === 'users' && <Users />}
            {content === 'destinations' && <Destinations />}
        </div>
    )
}

export default Admin