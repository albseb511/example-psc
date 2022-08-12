import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Context
export const AppContext = React.createContext()

export default function AppContextProvider({
    children
}){
    const [ productState, setProductState ] = useState({
        name: "",
        price: "",
        image: ""
    })
    const navigate = useNavigate()
    const updateNameAndPrice = (name,price) => {
        setProductState({
            ...productState,
            name,
            price
        })
    }
    const updateImage = (image_url) => {
        setProductState({
            ...productState,
            image: image_url
        })
    }
    const saveDataToServer = ({
        name,
        price,
        image_url
    }) => {
        console.log({
            name,
            price,
            image_url
        })
        fetch("http://localhost:5000/products",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                image_url
            })
        })
        .then(res=>{
            alert("succcess!")
            setProductState({
                name: "",
                price: "",
                image: ""
            })
            navigate("/")
        })
    }   
    // useReducer
    // reducer, dispatch
    // reducer -> UPDATE_NAME_PRICE, UPDATE_IMAGE_URL
    // 
    return (
        <AppContext.Provider value={{ productState, updateNameAndPrice, updateImage, saveDataToServer }}>
            {children}
        </AppContext.Provider>
    )
}
// 
// PAGE1 -> info
// PAGE2 -> info
