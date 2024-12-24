import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";
import { resetFormSubmitted } from "@/features/signIn/model/signInSlice";

const AuthRedirect: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { isAuthorized, isFormSubmitted} = useSelector((state: RootState) => state.signIn);

    useEffect(() => {
        if(isAuthorized && isFormSubmitted) {
            navigate("/");
            dispatch(resetFormSubmitted())
        }
    }, [isAuthorized, isFormSubmitted, navigate, dispatch])

    return null;
}

export default AuthRedirect;