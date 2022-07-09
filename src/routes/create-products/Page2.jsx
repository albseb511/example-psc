import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

export default function Page2() {
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [blob, setBlob] = useState(null);
    const {updateImage, saveDataToServer, productState} = useContext(AppContext);

    function onSubmit(e){
        e.preventDefault()

        var formdata = new FormData();
        formdata.append("image", file, file.name);

        var requestOptions = {
        method: 'POST',
        headers: {
            Authorization: "Bearer "
        },
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://api.imgur.com/3/upload", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            updateImage(result.data.link)
            saveDataToServer( 
                { 
                    name: productState.name,
                    price: productState.price,
                    image_url: result.data.link
            } )
        })
        .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        // binary large object
        try{
            file && setBlob( URL.createObjectURL( file ) );
        }
        catch(err){
            
        }
    },[file])
    // cleanup
    useEffect(()=>{
        return ()=>{
            URL.revokeObjectURL(blob)
        }
    },[blob])
    if(!productState.name || !productState.price){
        return <Navigate to="/create-product/part-1" />
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <h1>Page 2</h1>
                <div>
                    <input onChange={(e)=>{
                        console.log(e.target.files[0])
                        setFile(e.target.files[0])
                    }} type="file" placeholder='add image url' />
                </div>
                <input type="submit" />
        </form>
        <br/>
        <div>
            <img width="200px" src={blob} />
        </div>
        <br/>
        <br/>
        <Link to="/create-product/part-1">Go back</Link>
    </div>
  )
}
