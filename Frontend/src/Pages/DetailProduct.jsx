import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DetailProduct = () => {
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [pic, setPic] = useState("");
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((response) => {
      setproduct(response.data);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append('path',pic)
      console.log(formData);
      const requestData = {
        name: name,
        price: price,
        path:pic
      };
      console.log("name:", name);
      console.log("price:", price);
      console.log("pic:", pic);

      // let token = axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        formData,
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
        setPic('')
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
 const handlePic = (e) => {
  const selectedFile = e.target.files[0]; // Get the selected file
  console.log('Selected file:', selectedFile);

  // Update the 'pic' state
  setPic(selectedFile);
};

  return (
      <div style={{display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
        <h1>Edit Product:</h1>
        <tr >
          <th style={{padding:"10px 20px"}}>Name Product : </th>
          <th style={{padding:"20px 20px"}}>Price Product : </th>
        </tr>
        <tr style={{display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"row",gap:"20px"}}>
          <td>{product.name}</td>
          <td>{product.price}</td>
        </tr>
         
        <br />
        <tr><td></td></tr>
        <input type="text" value={name} onChange={handleNameChange}placeholder="Name Product" /><br />
        <input type="text" value={price} onChange={handlepriceChange} placeholder="Product Price" /> 
        <input type="file" onChange={handlePic} /> <br />
        <button onClick={handleSubmit}>Edit Product</button>
      </div>
  );
};

export default DetailProduct;
