import { login, setToken, signUp } from "@/services/auth-service";
import { User, LoginData, SignUpData } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider"
import { jwtDecode } from "jwt-decode";

const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode<User>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const useSignUp = () => {
  const router = useRouter();
  const { setUser } = useAuth(); 

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (response) => {
      if (response.token) {
        setToken(response.token);
        const user = decodeToken(response.token);
        if (user) {
          setUser(user); 
          toast.success(`Welcome ${user.name || "User"}`);
          router.push("/"); 
        }
      } else {
        toast.error("No token received from server");
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || "Failed to register user");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuth(); 

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (response) => {
      if (response.token) {
        setToken(response.token);
        const user = decodeToken(response.token);
        if (user) {
          setUser(user); 
          toast.success(`Welcome back ${user.name || "User"}`);
          router.push("/"); 
        }
      } else {
        toast.error("No token received from server");
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || "Invalid email or password");
    },
  });
};
