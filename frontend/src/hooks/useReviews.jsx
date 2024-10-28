import { useQuery } from '@tanstack/react-query'

const useReviews = () => {
    const { data: reviews, isLoading, isError } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/review/')
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
    return { reviews, isLoading, isError }
}

export default useReviews