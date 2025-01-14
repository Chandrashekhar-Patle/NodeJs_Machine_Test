import { NavLink } from "react-router-dom";
import CategoryList from "../Category/CategoryList";
import ProductList from "../Product/ProductList";

function Home() {
    return(
        <>
        <div className="absolute top-32 left-56 ">
            <h1 className="text-4xl font-bold">Home Component</h1>
            <h2>Node JS Machine Test</h2>

            <div className="flex justify-between">
                <NavLink to="/categories"
                    className="p-4 m-4 border-2 bg-slate-400">
                Category List</NavLink>
                <NavLink to="/products"
                    className="p-4 m-4 border-2 bg-slate-400">
                Product List
                </NavLink>
            </div>
        </div>
        </>
    )
}

export default Home;