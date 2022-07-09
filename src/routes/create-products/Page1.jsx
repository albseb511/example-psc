import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

export default function Page1() {
    const {productState, updateNameAndPrice} = useContext(AppContext);
    const [name, setName] = useState( productState.name || "");
    const [price, setPrice] = useState( productState.price || "");
    const navigate = useNavigate();
    // product name
    // price
    function onSubmit(e){
        e.preventDefault();
        navigate("/create-product/part-2")
        updateNameAndPrice(name, price)
    }
    function moveToNextPage(){
        navigate("/create-product/part-2")
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <h1>Page 1</h1>
            <div><input 
                    value={name}  
                    onChange={e=>setName(e.target.value)} 
                    placeholder='product name' /></div>
            <div><input 
                    value={price} 
                    onChange={e=>setPrice(e.target.value)}  
                    type="number" placeholder='price' /></div>
            <div>
                <input disabled={
                    name==="" || !price
                } type="submit" value="Save" />
            </div>
            <button 
                disabled={!productState.name && !productState.price} 
                onClick={moveToNextPage}>
                GO TO PAGE 2
            </button>
        </form>
    </div>
  )
}

// global variables
// components are represented by javascript -> react elements
// these react elements need to keep track of that information