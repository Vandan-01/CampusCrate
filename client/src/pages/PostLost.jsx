import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./PostItem.css";

export default function PostLost() {

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

const handleChange=(e)=>{

setForm({...form,[e.target.name]:e.target.value});

}

const submit=async(e)=>{

e.preventDefault();

setLoading(true);

try{

const data=new FormData();

data.append("type","lost");

data.append("title",form.title);
data.append("description",form.description);
data.append("category",form.category);
data.append("location",form.location);
data.append("date",form.date);
data.append("claimQuestion",form.claimQuestion);
data.append("tags",form.tags);

if(photo){

data.append("photo",photo);

}

await API.post("/items",data,{
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("Item Posted Successfully");

navigate("/lost");

}catch(err){

console.log(err);

alert(err.response?.data?.message || "Failed");

}

setLoading(false);

}

return(

<>

<Navbar/>

<div className="postContainer">

<form onSubmit={submit} className="postForm">

<h1>Report Lost Item</h1>

<input
required
placeholder="Title"
name="title"
onChange={handleChange}
/>

<textarea
required
placeholder="Description"
name="description"
onChange={handleChange}
/>

<select
name="category"
onChange={handleChange}
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
placeholder="Location"
name="location"
onChange={handleChange}
/>

<input
required
type="date"
name="date"
onChange={handleChange}
/>

<input
placeholder="Claim Question"
name="claimQuestion"
onChange={handleChange}
/>

<input
placeholder="Tags (comma separated)"
name="tags"
onChange={handleChange}
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