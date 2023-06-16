import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const response = await fetch(`https://frame-lab-server.vercel.app/users/admin/${user?.email}`);
      const data = await response.json();
      return data.admin;
    },
  });
  return [isAdmin];
};

export default useAdmin;
