import { useQuery } from '@tanstack/react-query'

const useBookings = () => {
    const { data: bookings, isLoading, isError } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/booking')
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || 'something went wrong'
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        }
    })
    return { bookings, isLoading, isError }
}

export default useBookings