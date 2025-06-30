import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/AuthStore";
const ProtectedRoute = ({children}: PropsWithChildren) => {
    const accessToken = useAuthStore((state)=>state.accessToken);
    const navigate = useNavigate();

    useEffect(()=>{
       
    }, [navigate, accessToken])
    return children;
}

export default ProtectedRoute;