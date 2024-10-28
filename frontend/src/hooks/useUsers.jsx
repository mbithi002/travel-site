import { useQuery } from '@tanstack/react-query'

const useUsers = () => {
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
    return { users, isLoading, isError }
}

export default useUsers