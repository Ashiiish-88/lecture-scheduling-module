import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { API_BASE } from "../config/api";

function Instructor() {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLectures = async () => {
    try {
      const response = await fetch(`${API_BASE}/instructor/lectures`, {
        credentials: "include"
      });

      if (!response.ok) {
        setMessage("Could not load lectures");
        return;
      }

      const data = await response.json();
      setLectures(data);
    } catch (err) {
      setMessage("Server error while fetching lectures");
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Back to Login
        </button>
      </div>
      {message && <p>{message}</p>}

      <div className="grid gap-3 md:grid-cols-2">
        {lectures.map((lecture) => (
          <Card key={lecture._id}>
            <p>title: {lecture.title}</p>
            <p>date: {new Date(lecture.date).toLocaleDateString()}</p>
            <p>course: {lecture.course?.title || "N/A"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Instructor;
