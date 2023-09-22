import React, { useEffect, useState } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom"
const Products = () => {
  const [products, setProducts] = useState([]);
const [name,setname]=useState("")
const [price,setprice]=useState(0)

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSumbit = async () => {
    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);


    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        // Refresh the player list after successfully adding a player
        axios
          .get("http://localhost:8000/api/products")
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        // Clear the input fields
        setname("");
        setprice("");
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
    }



  return (
    <>
      <h1>Products</h1>

      {products.map((elem) => (
        <>
        <NavLink to={`/products/${elem.id}`}>
        <li>{elem.name} : {elem.price}</li>
        </NavLink>
        </>
      ))}


<div>
  <input type="text" value={name} onChange={(e)=>setname(e.target.value)} />
  <input type="number" value={price} onChange={(e)=>setprice(e.target.value)} />
  <button onClick={handleSumbit}>Put Product</button>
</div>

    </>
  );
};

export default Products;
