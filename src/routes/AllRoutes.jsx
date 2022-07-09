import { Routes, Route } from "react-router-dom";
import Page1 from "./create-products/Page1";
import Page2 from "./create-products/Page2";
import Home from "./Home";

function AllRoutes(){
    // state information here
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-product/part-1" 
                element={<Page1/>}
                 />
            <Route path="/create-product/part-2" 
                element={<Page2/>}
                 />

        </Routes>
    )
}

export default AllRoutes

// maintain this information with Context