import { useState } from "react";
import BGimg from "../assets/loginpageBG.jpeg";
import { Link } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:8080"

const Signup = () => {

    const[formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    })

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:value,
        }))
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try{
            const response = await axios.post(API_URL + "/signup", formData);
            if(response.status >= 200 && response.status < 300){
                setSignupSuccess(true);
            } 
        }catch(error){
            setErrorMsg(true);
        }
        setFormData({  //resets the form data after a successful submission
            email: '',
            username: '',
            password: '',
        })
    }

    return (
        <div className="h-screen relative lg:overflow-hidden">
            <img src={BGimg} className="absolute h-full w-full left-0 top-0 object-cover -z-50"></img>

            <div className="py-6 lg:pl-20 pl-5">
                <Link to={"/"} className="text-4xl font-semibold">Sphere</Link>
            </div>
            <div className="h-full flex flex-col items-center pt-40">
                <h1 className="text-5xl font-semibold">Sign Up</h1>
                <p className="text-md mt-3 text-neutral-800">Enter your details to begin</p>
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <label htmlFor="email id"></label>
                        <input className="bg-white w-[25rem] h-[3rem] rounded-full p-5"
                            required
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your Email id"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email id"></label>
                        <input className="bg-white w-[25rem] h-[3rem] rounded-full p-5"
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Create your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email id"></label>
                        <input className="bg-white w-[25rem] h-[3rem] rounded-full p-5"
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMsg && (
                    <h1 className="text-md text-red-600 mt-3">This username or email is already registered</h1>
                )}
                    <button type="submit" className="w-[20rem] h-[3rem] bg-blue-500 rounded-full mt-5">Create account</button>
                </form>
                {signupSuccess && (
                     <div className="py-5 flex flex-row gap-5 items-center">
                     <p className="text-md text-blue-700">Account created Successfully</p>
                     <Link to="/" className="text-md text-black underline">Login Now.</Link>
                 </div>
                )}
            </div>
        </div>
    )
}

export default Signup;