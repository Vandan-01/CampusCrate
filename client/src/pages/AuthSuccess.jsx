import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {

const navigate=useNavigate();

const [params]=useSearchParams();

useEffect(()=>{

const token=params.get("token");

if(token){

localStorage.setItem("token",token);

navigate("/");

}else{

navigate("/login");

}

},[]);

return(

<div
style={{
display:"grid",
placeItems:"center",
height:"100vh",
fontSize:"24px"
}}
>

Logging you in...

</div>

)

}