import { useQuery } from '@tanstack/react-query'

const useDestinations = () => {
    const { data: destinations, isLoading, isError } = useQuery({
        queryKey: ['destinations'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/destinations', { method: 'GET' })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || 'something went wrong'
                }

                return data
            } catch (error) {
                console.log(error.message);
            }
        },
    })
    return { destinations, isLoading, isError }
}

export default useDestinations