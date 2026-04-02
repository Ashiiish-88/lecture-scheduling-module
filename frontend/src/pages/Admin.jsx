import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { API_BASE } from "../config/api";

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("instructors");
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [message, setMessage] = useState("");

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    level: "",
    image: ""
  });

  const [lectureForm, setLectureForm] = useState({
    title: "",
    description: "",
    date: "",
    course: "",
    instructor: ""
  });

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/instructors`, {
        credentials: "include"
      });

      if (!response.ok) {
        setMessage("Could not load instructors");
        return;
      }

      const data = await response.json();
      setInstructors(data);
    } catch (err) {
      setMessage("Server error while fetching instructors");
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/courses`, {
        credentials: "include"
      });

      if (!response.ok) {
        setMessage("Could not load courses");
        return;
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setMessage("Server error while fetching courses");
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/lectures`, {
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
    fetchInstructors();
    fetchCourses();
    fetchLectures();
  }, []);

  const createCourse = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/admin/course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(courseForm)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create course");
        return;
      }

      setMessage("Course created");
      setCourseForm({ title: "", description: "", level: "", image: "" });
      fetchCourses();
    } catch (err) {
      setMessage("Server error while creating course");
    }
  };

  const createLecture = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/admin/lecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(lectureForm)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create lecture");
        return;
      }

      setMessage("Lecture created");
      setLectureForm({
        title: "",
        description: "",
        date: "",
        course: "",
        instructor: ""
      });
      fetchLectures();
    } catch (err) {
      setMessage("Server error while creating lecture");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Back to Login
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("instructors")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Instructors
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("courses")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Courses
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("lectures")}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Lectures
        </button>
      </div>

      {message && <p>{message}</p>}

      {activeTab === "instructors" && (
        <section className="space-y-3">
          <h2 className="text-xl">Instructors</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {instructors.map((instructor) => (
              <Card key={instructor._id}>
                <p>username: {instructor.username}</p>
                <p>instructorId: {instructor._id}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === "courses" && (
        <section className="space-y-3">
          <h2 className="text-xl">Courses</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course._id}>
                <p>title: {course.title}</p>
                <p>courseId: {course._id}</p>
              </Card>
            ))}
          </div>

          <h2 className="text-xl">Create Course</h2>
          <Card>
            <form onSubmit={createCourse} className="space-y-3">
              <input
                type="text"
                placeholder="title"
                value={courseForm.title}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, title: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="description"
                value={courseForm.description}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, description: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="level"
                value={courseForm.level}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, level: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="image"
                value={courseForm.image}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, image: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
                Create Course
              </button>
            </form>
          </Card>
        </section>
      )}

      {activeTab === "lectures" && (
        <section className="space-y-3">
          <h2 className="text-xl">Lectures</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {lectures.map((lecture) => (
              <Card key={lecture._id}>
                <p>title: {lecture.title}</p>
                <p>lectureId: {lecture._id}</p>
                <p>date: {new Date(lecture.date).toLocaleDateString()}</p>
                <p>course: {lecture.course?.title || "N/A"}</p>
                <p>courseId: {lecture.course?._id || "N/A"}</p>
                <p>instructor: {lecture.instructor?.username || "N/A"}</p>
                <p>instructorId: {lecture.instructor?._id || "N/A"}</p>
              </Card>
            ))}
          </div>

          <h2 className="text-xl">Create Lecture</h2>
          <Card>
            <form onSubmit={createLecture} className="space-y-3">
              <input
                type="text"
                placeholder="title"
                value={lectureForm.title}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, title: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="description"
                value={lectureForm.description}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, description: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="date"
                value={lectureForm.date}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, date: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="courseId"
                value={lectureForm.course}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, course: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="instructorId"
                value={lectureForm.instructor}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, instructor: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                required
              />
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
                Create Lecture
              </button>
            </form>
          </Card>
        </section>
      )}
    </div>
  );
}

export default Admin;
