import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useInstructor = () => {
  const { user } = useAuth();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ['isInstructor', user?.email],
    queryFn: async () => {
      const response = await fetch(`https://frame-lab-server.vercel.app/users/instructor/${user?.email}`);
      const data = await response.json();
      return data.instructor;
    },
  });
  return [isInstructor];
};

export default useInstructor;
