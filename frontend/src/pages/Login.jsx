import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.userType === "admin") {
        navigate("/admin");
        return;
      }

      if (data.userType === "instructor") {
        navigate("/instructor");
        return;
      }

      setError("Unknown user type");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>

            {error && <p className="text-red-300">{error}</p>}

            <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
