import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary navigation for testing
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-[#1a1d24] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[#1e2128] p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-500 mb-2">
              Fellowship 360
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to Groups' : 'Join Groups'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-[#2a2f38] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-[#2a2f38] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              className="text-blue-500 hover:text-blue-400"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;