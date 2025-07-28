import { useContext, useState, useEffect } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Add useEffect to log the error change
  useEffect(() => {
    if (error) {
      console.log("Error state changed:", error);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if password is provided
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // Clear error before making a request
    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      // Handle the case where token is not returned
      if (!token) {
        setError("Login failed: No token received");
        return;
      }

      // Save token and update user context
      localStorage.setItem("token", token);
      updateUser(response.data);

      // Navigate based on user role
      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      // Handle Axios error with specific error messages
      if (err.response && err.response.status === 401) {
        const msg = err.response?.data?.message || "Invalid email or password";
        setError(msg);
      } else {
        // Handle generic error
        setError("Invalid Creds Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#282828] px-4">
        <div className="max-w-md w-full bg-[#3c3836] p-8 rounded-xl shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-[#ebdbb2]">Welcome Back</h3>
            <p className="text-sm text-[#a89984] mt-1">Please enter your details to log in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="test@gmail.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            {/* Render error if it exists */}
            {error && (
              <p className="text-[#fb4934] text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#83a598] text-[#282828] py-2 rounded-md font-medium hover:bg-[#689d6a] transition duration-200"
            >
              Login
            </button>

            <p className="text-sm text-center text-[#a89984]">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#fabd2f] hover:underline font-medium"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
