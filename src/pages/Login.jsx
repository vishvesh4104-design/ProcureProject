import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/",
      {
        username,
        password,
      }
    );

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    setIsLoggedIn(true);   // 👈 VERY IMPORTANT
    navigate("/dashboard");

  } catch (error) {
    alert("Invalid credentials");
  }
};


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
