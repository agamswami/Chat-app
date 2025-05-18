'use client'
import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import Login from './Login';
import SignUp from './SignUp';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import JWTLogin from '../../../utils/loginJWTFunc';


const Auth = () => {
    const { isLogin, toggleAuth } = useAuthStore();
    const {updateAuthName} = useAuthStore();
    const router = useRouter();
    
    useEffect(() => {
        JWTLogin(updateAuthName, router);
    }, []);




    return (
        <div>
            {isLogin ? <Login /> : <SignUp />}

            {/* <p className="mt-4 text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                    onClick={toggleAuth}
                    className="ml-1 text-indigo-600 hover:underline"
                >
                    {isLogin ? "Sign Up" : "Sign In"}
                </button>
            </p> */}
        </div>
    );
};

export default Auth;
