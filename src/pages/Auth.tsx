import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/config"; // ✅ use centralized config

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

      console.log("🔗 Requesting:", endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      if (isLogin) {
        login(data.user, data.token);
        toast.success("✅ Successfully logged in!");
        navigate("/");
      } else {
        toast.success("🎉 Account created! Please sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("❌ Auth error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-ev-blue via-ev-green to-ev-indigo bg-clip-text text-transparent">
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to continue your journey" : "Create an account to get started"}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
          <form className="space-y-6" onSubmit={handleAuth}>
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

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-ev-blue via-ev-green to-ev-indigo text-white font-semibold rounded-xl"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-ev-blue hover:text-ev-green"
          >
            {isLogin ? "Create an account" : "Sign in instead"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
