import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <>
        <Login onLogin={setUser} />
        <Register onRegister={setUser} />
      </>
    );
  }

  return <Tasks user={user} onLogout={() => setUser(null)} />;
}

export default App;