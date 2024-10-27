import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { formatMemberSinceDate } from '../../utils/date'

const Users = () => {
    const queryClient = useQueryClient()
    const { data: users, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/users/')
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error)
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        }
    })
    return (
        <div className="flex flex-col items-center w-full my-3">
            <div className="overflow-x-scroll sm:overflow-x-auto w-full">
                <table className="table bg-gray-100 text-base-100">
                    {/* head */}
                    <thead className='text-neutral'>
                        <tr>
                            <th>
                            </th>
                            <th>username</th>
                            <th>Full Name</th>
                            <th>E-Mail</th>
                            <th>Joined on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, i) => (
                                <tr className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {i + 1}
                                    </th>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        {user.fullName}
                                        <br />
                                    </td>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>{user.email}</td>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {formatMemberSinceDate(user.createdAt)}
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot className='text-neutral'>
                        <tr>
                            <th>
                            </th>
                            <th>username</th>
                            <th>Full Name</th>
                            <th>E-Mail</th>
                            <th>Joined on</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Users