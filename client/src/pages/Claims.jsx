import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Claims.css";

export default function Claims() {

const [claims,setClaims]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

loadClaims();

},[]);

async function loadClaims(){

try{

const res=await API.get("/claims");

setClaims(res.data.data);

}catch(err){

console.log(err);

}

setLoading(false);

}

async function updateClaim(id,status){

try{

await API.patch(`/claims/${id}`,{

status

});

alert("Updated");

loadClaims();

}catch(err){

alert(err.response?.data?.message);

}

}

if(loading){

return <h2>Loading...</h2>

}

return(

<>

<Navbar/>

<div className="claimsContainer">

<h1>Claims</h1>

{claims.map(claim=>(

<div
key={claim._id}
className="claimCard"
>

<div>

<h3>

{claim.itemId.title}

</h3>

<p>

<b>Claimed By:</b>

{" "}

{claim.claimantId.name}

</p>

<p>

{claim.message}

</p>

<p>

<b>Answer:</b>

{" "}

{claim.answer}

</p>

<p>

Status :

{" "}

{claim.status}

</p>

</div>

{claim.status==="pending" &&

<div className="claimBtns">

<button
className="approve"
onClick={()=>updateClaim(claim._id,"approved")}
>

Approve

</button>

<button
className="reject"
onClick={()=>updateClaim(claim._id,"rejected")}
>

Reject

</button>

</div>

}

</div>

))}

</div>

</>

)

}