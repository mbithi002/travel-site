import React from 'react'
import Avatar from '../../components/common/Avatar'
import useUsers from '../../hooks/useUsers'
import { formatMemberSinceDate } from '../../utils/date'

const Users = () => {
    const { users, isLoading, isError } = useUsers()
    if (isLoading) {
        return <div className="skeleton h-[75dvh] my-3 w-full bg-gray-300"></div>
    }
    if (isError) {
        return <div className="h-[75dvh] my-3 w-full text-red-500 text-center flex items-center justify-center">
            <p className="">Something went wrong😢😢</p>
        </div>
    }
    return (
        < div >
            <div className="overflow-x-scroll sm:overflow-x-auto w-full min-h-[75dvh]">
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
                                <tr key={user._id} className='hover:bg-base-100 text-neutral transition-all duration-100'>
                                    <th className='hover:bg-gray-100 transition-all duration-100'>
                                        {i + 1}
                                    </th>
                                    <td className='hover:bg-gray-100 transition-all duration-100'>
                                        <div className="flex items-center gap-3">
                                            <Avatar />
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