import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DetailProduct = () => {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((response) => {
      setproduct(response.data);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      // const formData = new FormData();
      // formData.append("name", name);
      // formData.append("price", price);
      // console.log(formData);
      const requestData = {
        name: name,
        price: price,
      };
      console.log("name:", name);
      console.log("price:", price);

      let token = axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        requestData,
        {
          headers: { 
            "Content-Type": "multipart/form-data" 
        },
        }
      );

      if (response.status === 200) {
        // Refresh the player data after successfully updating
        setproduct({ ...product, name, price });

        // Clear the input fields
        setName("");
        setprice("");
      }
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // Update the name state when input changes
  };

  const handlepriceChange = (e) => {
    setprice(e.target.value); // Update the age state when input changes
  };
  return (
    <div>
      <div>
        <h1>Edit Product:</h1>
        {product.name} :{product.price}
        <br />
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="text" value={price} onChange={handlepriceChange} />
        <button onClick={handleSubmit}>Edit Product</button>
      </div>
    </div>
  );
};

export default DetailProduct;
