import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import API from "../services/api";
import "./Items.css";

export default function MyPosts(){

const [items,setItems]=useState([]);

const load=async()=>{

try{

const res=await API.get("/items/mine");

setItems(res.data.data);

}catch(err){

console.log(err);

}

}

useEffect(()=>{

load();

},[]);

return(

<>

<Navbar/>

<div className="itemsContainer">

<h1>

My Posts

</h1>

<div className="grid">

{items.map(item=>(

<ItemCard
key={item._id}
item={item}
/>

))}

</div>

</div>

</>

)

}