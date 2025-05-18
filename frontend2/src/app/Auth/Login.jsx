'use client'
import React, { useState } from "react"
// import useAuthStore from '../../store/useAuthStore';
import axios from "axios";
import { useRouter } from 'next/navigation';
import useAuthStore from "../../store/useAuthStore" 

const Login = () => {
    const router = useRouter();

    const { isLogin, toggleAuth ,authName , updateAuthName} = useAuthStore();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');



 
 
    const loginFunc = async (event) => {
        event.preventDefault();
 
 
        try {
            const res = await axios.post('http://localhost:8080/auth/login', {
                username: username,
                password: password
            },{
                withCredentials: true
            })
            updateAuthName(username);
            router.push('/chat')
 
 
        } catch (error) {
            console.log("Error in login function : ", error.message);
        }
    }
 
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://static.vecteezy.com/system/resources/previews/006/828/181/non_2x/flat-illustration-of-two-chat-bubble-intersect-each-other-suitable-for-online-chat-message-service-logo-group-discussion-forum-and-social-media-chat-bubble-icon-free-vector.jpg"
                    className="mx-auto h-40 w-40  "
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                            User Name 
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                                required
                                autoComplete="username"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={loginFunc}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="#" onClick={(e) => {toggleAuth() ; e.preventDefault()}}className="font-semibold text-indigo-600 hover:text-indigo-500" >
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    )
}


export default Login