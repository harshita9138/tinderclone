import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";



const Login = () => {
  const { setProgress, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setProgress(0);
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill all the fields");
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please provide an valid Email id");
    }

    const res = await axios.post("http://localhost:8080/api/login", {
      email,
      password,
    });
    const data = await res.data;
    setUser(data.data);
    localStorage.setItem("token", data.token);
    setProgress(100);
    if (data.success === true) {
      toast.success(data.message);
      e.target.reset();
      navigate("/Profile");
    } else {
      toast.error(data.message);
    }
  };

  // ANOTHER WAY TO HANDLE LOGIN
  
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setProgress(0);
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  
  //   if (!email || !password) {
  //     toast.error("Please fill all the fields");
  //     return;
  //   }
  //   if (!email.includes("@") || !email.includes(".")) {
  //     toast.error("Please provide a valid Email id");
  //     return;
  //   }
  
  //   try {
  //     const res = await axios.post("http://localhost:8080/api/login", {
  //       email,
  //       password,
  //     });
  //     const data = res.data;
  
  //     if (data.success === true) {
  //       setUser(data.data);
  //       localStorage.setItem("token", data.token);
  //       setProgress(100);
  //       toast.success(data.message);
  //       e.target.reset();
  //       navigate("/Profile");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);  // Debugging log
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //       toast.error(error.response.data.message || "An error occurred during login");
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       console.error("Request data:", error.request);
  //       toast.error("No response from server. Please try again later.");
  //     } else {
  //       // Something else happened while setting up the request
  //       console.error("Error message:", error.message);
  //       toast.error("An error occurred during login");
  //     }
  //   }
  // };
  
  
  return (
 <>
  <div className="flex flex-col justify-center items-center my-32">
      <h4 className="font-bold text-3xl text-white">Login</h4>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-5 mt-5">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex gap-8 justify-between items-center mt-5">
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-md"
          >
            Login
          </button>
          <Link to="/signup" className="text-primary text-sm">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
 </>
  )
}

export default Login