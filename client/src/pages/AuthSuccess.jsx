import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthSuccess() {

const navigate=useNavigate();
const { login } = useAuth();

const [params]=useSearchParams();

useEffect(()=>{

const token=params.get("token");

if(token){
  login(token).then(() => navigate("/", { replace: true })).catch(() => navigate("/login", { replace: true }));

}else{
  navigate("/login", { replace: true });

}
},[login, navigate, params]);

return(

<div className="loading-state" style={{ minHeight: "100vh" }}>Preparing your CampusCrate…</div>

)

}
