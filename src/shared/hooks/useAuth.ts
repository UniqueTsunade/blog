import { RootState } from "@/app/store"
import { useSelector } from "react-redux"

export const useAuth = () => {
    const isAuthenticated = useSelector((state: RootState) => state.signIn.isAuthorized);

    return { isAuthenticated };
}