import { useQuery } from "@tanstack/react-query";


const useClasses = () => {
    const { data: allClasses = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await fetch('https://frame-lab-server.vercel.app/classes/admin');
            return res.json();
        }
    })

    return [allClasses, loading, refetch]
};

export default useClasses;