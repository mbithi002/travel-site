import { useQuery } from "@tanstack/react-query"

const useBookingsForDestination = (destinationId) => {
    const { data: bookignsForDestination, isLoading, isError } = useQuery({
        queryKey: ['bookingsForDestination'],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/booking/forDestination/${destinationId}`)
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
    return { bookignsForDestination, isLoading, isError }
}

export default useBookingsForDestination