'use client'
import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const { isLogin, toggleAuth } = useAuthStore();

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
