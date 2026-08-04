import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./PostItem.css";

export default function PostFound(){

const navigate=useNavigate();

const [loading,setLoading]=useState(false);

const [form,setForm]=useState({
title:"",
description:"",
category:"Electronics",
location:"",
date:"",
claimQuestion:"",
tags:""
});

const [photo,setPhoto]=useState(null);

const handle=(e)=>{

setForm({...form,[e.target.name]:e.target.value});

}

const submit=async(e)=>{

e.preventDefault();

setLoading(true);

try{

const data=new FormData();

data.append("type","found");

Object.keys(form).forEach(key=>{

data.append(key,form[key]);

});

if(photo){

data.append("photo",photo);

}

await API.post("/items",data,{
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("Posted Successfully");

navigate("/found");

}catch(err){

console.log(err);

alert(err.response?.data?.message);

}

setLoading(false);

}

return(

<>

<Navbar/>

<div className="postContainer">

<form
className="postForm"
onSubmit={submit}
>

<h1>Report Found Item</h1>

<input
required
name="title"
placeholder="Title"
onChange={handle}
/>

<textarea
required
name="description"
placeholder="Description"
onChange={handle}
/>

<select
name="category"
onChange={handle}
>

<option>Electronics</option>
<option>Bottle</option>
<option>Book</option>
<option>ID Card</option>
<option>Bag</option>
<option>Keys</option>
<option>Others</option>

</select>

<input
required
name="location"
placeholder="Location"
onChange={handle}
/>

<input
required
type="date"
name="date"
onChange={handle}
/>

<input
name="claimQuestion"
placeholder="Claim Question"
onChange={handle}
/>

<input
name="tags"
placeholder="Tags"
onChange={handle}
/>

<input
type="file"
accept="image/*"
onChange={(e)=>setPhoto(e.target.files[0])}
/>

<button>

{loading?"Posting...":"Post Item"}

</button>

</form>

</div>

</>

)

}