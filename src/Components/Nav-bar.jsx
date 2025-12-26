import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import CategoryPage from "./CategoryPage";
import RestaurantLogin from "./log";
import RestaurantRegister from "./Register";
import RestaurantForgetPassword from "./Forget-Password";
import RestaurantResetPassword from "./Reset-Password";



const Nav_bar = () => {

    return (

        <>

            <BrowserRouter>
            
                <nav className="flex justify-around flex-wrap">

                    <Link to="/">log</Link>

                    <Link to="/register">Register</Link>

                    <Link to="/forget-password">Forget-Password</Link>

                    <Link to="/reset-password">Reset Password</Link>

                    <Link to="/CategoryPage">CategoryPage</Link>


                </nav>

                <Routes>

                    <Route path = "/" element = {<RestaurantLogin/>}></Route>
                    <Route path = "/register" element = {<RestaurantRegister/>}></Route>
                    <Route path = "/forget-password" element = {<RestaurantForgetPassword/>}></Route>
                    <Route path = "/reset-password" element = {<RestaurantResetPassword/>}></Route>
                    <Route path = "/CategoryPage" element = {<CategoryPage/>}></Route>
                    


                </Routes>
                
            </BrowserRouter>

        </>
    )
}

export default Nav_bar