import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import ForgotPassword from "./Forget-Password"
import ResetPassword from "./Reset-Password"


const Nav_bar = () => {

    return (

        <>

            <BrowserRouter>
            
                <nav>

                    <Link to="/login">Login</Link>

                    <Link to="/register">Register</Link>

                    <Link to="/forget-password">Forget Password</Link>

                    <Link to="/reset-password">Reset Password</Link>

                </nav>

                <Routes>

                    <Route path = "/login" element = {<Login/>}></Route>
                    <Route path = "/register" element = {<Register/>}></Route>
                    <Route path = "/forget-password" element = {<ForgotPassword/>}></Route>
                    <Route path = "/reset-password" element = {<ResetPassword/>}></Route>

                </Routes>
                
            </BrowserRouter>

        </>
    )
}

export default Nav_bar

