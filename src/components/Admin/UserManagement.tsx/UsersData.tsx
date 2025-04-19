
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type Props = {
    role: string
    status: boolean
    getUserDetail?: (userId: string) => void
}

const UsersData = (props: Props) => {

    const navigate = useNavigate()

    const { residents, collectors } = useSelector((state: any) => state.admin)

    const users = props.role === 'resident' ? residents : collectors

    const handleCollectorDetails = (firstName: string, lastName: string, userId: string) => {
        const type = props.status ? 'arrpoved' : 'request'
        navigate(`/admin/collectors/${firstName + lastName}`, {state: {userId: userId, type: type}})
    }


    return (
        <tbody className="">
            {users && users.map((user: any, index: number) => (
                <tr key={user._id} className="border-b">
                    <td className="pl-6 pr-3">{index + 1}</td>
                    <td className="p-3">
                        {user.image ? (
                            <img
                                className="rounded-full h-12 w-12 object-cover"
                                src={user.image}
                                alt={`${user.firstName}'s profile`}
                            />
                        ): 
                        <FaUserCircle className='rounded-full h-12 w-12 object-cover'/>}
                    </td>
                    <td className="p-3">{user.firstName + ' ' + user.lastName}</td>
                    <td className="p-3">{user.mobile}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.address.district}</td>
                    <td className="p-3">{user.address.city}</td>
                    <td className="pl-4 py-4 ">
                        {props.role === 'resident' ?
                            <button
                                onClick={() => props.getUserDetail?.(user._id)}
                                className="px-6 py-2 bg-accent text-white rounded-3xl cursor-pointer hover:bg-accent/90">
                                View Detail
                            </button> :
                            <button 
                            onClick={() => handleCollectorDetails(user.firstName, user.lastName, user._id)}
                            className="px-6 py-2 bg-accent text-white rounded-3xl cursor-pointer hover:bg-accent/90">
                                View Detail
                            </button>
                        }

                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default UsersData