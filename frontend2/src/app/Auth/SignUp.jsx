'use client'
import React, { useState } from "react"
import useAuthStore from '../../store/useAuthStore.js';
import axios from "axios";
import { useRouter } from 'next/navigation';


const SignUp = () => {
    const router = useRouter();
    // const { isLogin, toggleAuth } = useAuthStore();
    const { isLogin, toggleAuth ,updateAuthName} = useAuthStore();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');


    const signUpFunc = async (event) => {
        event.preventDefault();
    
    
        try {
            const res = await axios.post('http://localhost:8080/auth/signup', {
                username: username,
                password: password
            },{
                withCredentials: true
            })
            if(res.data.message === "Username already exists") {
                alert('Username already exists');
            } else {
                console.log("done sign up")

                updateAuthName(username);
                router.push('/chat')
            }
        } catch (error) {
            console.log("Error in signup function : ", error.message);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://static.vecteezy.com/system/resources/previews/006/828/181/non_2x/flat-illustration-of-two-chat-bubble-intersect-each-other-suitable-for-online-chat-message-service-logo-group-discussion-forum-and-social-media-chat-bubble-icon-free-vector.jpg"
                    className="mx-auto h-40 w-40"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                            User Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div> */}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}


                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={signUpFunc}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => {toggleAuth() ;e.preventDefault()}} className="font-semibold text-indigo-600 hover:text-indigo-500" >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
