import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";


function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      setPage("tasks");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setPage("login");
  };

  return (
    <>
      <Navbar user={user} onLogout={logout} onNavigate={setPage} />

      {page === "login" && <Login onSuccess={(u) => { setUser(u); setPage("tasks"); }} />}
      {page === "register" && <Register onSuccess={(u) => { setUser(u); setPage("tasks"); }} />}
      {page === "tasks" && user && <Tasks />}
    </>
  );
}

export default App;