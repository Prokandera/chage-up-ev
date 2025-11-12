import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/config"; // ✅ centralized API base

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${API_BASE_URL}/auth/login`
        : `${API_BASE_URL}/auth/signup`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      if (isLogin) {
        login(data.user, data.token); // ✅ AuthContext saves session
        toast.success("Successfully logged in!");
        navigate("/");
      } else {
        toast.success("Account created successfully! Please sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ev-blue/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-ev-green/10 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-ev-indigo/10 rounded-full animate-float" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-ev-blue/10 rounded-full animate-float-delayed" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 animate-slide-in-bottom">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-r from-ev-blue to-ev-green rounded-full shadow-lg animate-scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-ev-blue via-ev-green to-ev-indigo bg-clip-text text-transparent animate-fade-in">
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in">
            {isLogin
              ? "Sign in to continue your journey"
              : "Create an account to get started"}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20 hover-lift">
          <form className="space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                  <Input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </>
              )}

              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-ev-blue via-ev-green to-ev-indigo hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white font-semibold rounded-xl"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Sign Up"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">
                {isLogin ? "New here?" : "Already a member?"}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-ev-blue hover:text-ev-green hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            {isLogin ? "Create an account" : "Sign in instead"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
