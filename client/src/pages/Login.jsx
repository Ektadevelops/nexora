import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/authService";
import { setCredentials } from "../store/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await login(formData);

      dispatch(
        setCredentials({
          token: response.token,
          user: response.user,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Nexora</h1>

          <p className="mt-2 text-slate-500">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-slate-500"
              placeholder="admin@nexora.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-slate-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-slate-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
