import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useInstructor = () => {
  const { user } = useAuth();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ['isInstructor', user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/users/instructor/${user?.email}`);
      const data = await response.json();
      return data.instructor;
    },
  });
  return [isInstructor];
};

export default useInstructor;
