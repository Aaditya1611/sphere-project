import BGimg from "../assets/loginpageBG.jpeg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //You can send the form data to an API or perform other action here

        //resets the form after submission
        setFormData({
            username: '',
            password: '',
        })
    }

    return (
        <div className="h-screen relative lg:overflow-hidden">

            <img src={BGimg} className="absolute top-0 left-0 w-full h-full object-cover -z-50" alt="main bg image"></img>
            <div className="flex flex-row justify-between py-6 max-w-full mx-auto lg:px-20 px-5 items-center">

                <h1 className="text-4xl font-semibold">Sphere</h1>
                <Link to={"/signup"} className="underline text-md">Create an account</Link>
            </div>
            <div className="h-full flex justify-center pt-40">
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl font-semibold">Welcome Back</h1>
                    <p className="text-md mt-3 text-neutral-800">Enter your unique account details </p>
                    <form className="flex flex-col items-center">
                        <div className="mt-5">
                            <label htmlFor="username"></label>
                            <input className="bg-white w-[25rem] h-[3rem] rounded-full p-5"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password"></label>
                            <input className="bg-white w-[25rem] h-[3rem] rounded-full p-5"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <Link to="/forgotpasswd" className="text-sm underline my-5">Forgot Password?</Link>
                        <button className="w-[25rem] h-[3rem] bg-blue-500 text-white rounded-full" type="submit">Log In</button>
                    </form>
                    <div className="py-5">
                        <p className="text-md text-red-700">Invalid username or password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;