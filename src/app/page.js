'use client'
import React from "react";

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">Login with Google</h1>
          <p className="text-gray-500">Access your account securely</p>
        </div>
        
        <div className="mb-8 text-center">
          <a href={`${API_URL}/auth/google`}>
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Sign in with Google
            </button>
          </a>
        </div>
        
        <div className="flex items-center mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">or use test credentials</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        {/* <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Test Account</h2>
          
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Email:</p>
              <div className="flex justify-center items-center">
                <span className="text-gray-800 bg-gray-100 px-4 py-2 rounded">testuser@example.com</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Password:</p>
              <div className="flex justify-center items-center">
                <span className="text-gray-800 bg-gray-100 px-4 py-2 rounded">testpassword123</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Use these credentials to test the application
          </p>
        </div> */}
      </div>
    </div>
  );
}