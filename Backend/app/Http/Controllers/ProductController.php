<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index( ){
        $product=Product::all();
        return $product ;
    }
    
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required',
            'price' => 'numeric',
            'path' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
 // Adjust validation rules as needed
        ]);
    
        // Create a new Product instance
        $product = new Product;
    
        // Populate the Product instance with data from the request
        $product->name = $request->input('name');
        $product->price = $request->input('price');
    
        // Handle picture upload and save the picture path
        if ($request->hasFile('path')) {
            $picture = $request->file('path');
            $picturePath = $picture->store('product_pictures', 'public'); // Customize the path as needed
            $product->path = $picturePath;
        }
    
        // Save the Product record to the database
        $product->save();
    
        // Optionally, return a response to indicate success
        return response()->json(['message' => 'Product created successfully']);
    }
    


    
    public function update(Request  $request, $id)
    {

        
        $product = Product::findOrFail($id);
    
        $product->name = $request->input('name');
        $product->price = $request->input('price');
    
        if ($request->hasFile('path')) {
            if ($product->picture) {
                Storage::disk('public')->delete($product->picture);
            }
    
            $newPicture = $request->file('path');
            $newPicturePath = $newPicture->store('product_pictures', 'public'); // Customize the path as needed
            $product->path = $newPicturePath;
        }
    
        $product->save();
        return response()->json(['message' => 'Product updated successfully']);
    }
    
    
    public function show( $id){
        $product=Product::findOrFail($id);
        return $product ;
    }
}
