<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index( ){
        $product=Product::all();
        return $product ;
    }
    
    public function store(Request $request) {
        // Create a new Player instance
        $data = new Product;
        
        // Populate the Player instance with data from the request
        $data->name = $request->input('name');
        $data->price = $request->input('price');
        // Add more fields as needed
        
        // Save the Player record to the database
        $data->save();
    }
    public function update(Request $request, $id)
    {
        // Find the product by ID
        $product = Product::findOrFail($id);
    
        // Validate the request data
        $request->validate([
            'name' => 'required',
            'price' => 'numeric',
            // Add any other validation rules as needed
        ]);
    
        // Update the product's data
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        // Add more fields as needed
    
        // Save the updated product
        $product->save();
    
        // Optionally, return a response to indicate success
        return response()->json(['message' => 'Product updated successfully']);
    }
    
    
    public function show( $id){
        $product=Product::findOrFail($id);
        return $product ;
    }
}
