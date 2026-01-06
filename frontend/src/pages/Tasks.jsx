import { useEffect, useState } from "react";
import api from "../api/api";
import TaskModal from "../components/TaskModal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const createTask = async (data) => {
    await api.post("/tasks", {
      title: data.title,
      isDone: data.isDone,
      assignedUserId: data.assigneeId,
    });

    setShowModal(false);
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-indigo-600 animate-pulse">Loading tasks…</span>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Tasks</h2>

        <button onClick={() => setShowModal(true)} className="btn-primary">
          + New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-zinc-500 mt-20">No tasks yet ✨</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="card p-5">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={
                    task.isDone ? "text-emerald-600" : "text-indigo-600"
                  }
                >
                  {task.isDone ? "Done" : "Pending"}
                </span>
              </p>
              <p className="text-sm mt-2">
                Assign To:{" "}
                <span
                  className={
                    task.assignedUserEmail ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {task.assignedUserEmail
                    ? task.assignedUserEmail
                    : "Unassigned"}
                </span>
              </p>
              <p className="text-sm mt-2">
                Created By:{" "}
                <span
                  className={
                    task.createdByUserEmail
                      ? "text-emerald-600"
                      : "text-red-600"
                  }
                >
                  {task.createdByUserEmail
                    ? task.createdByUserEmail
                    : "Unassigned"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={createTask}
        users={users}
        initialData={{ title: "", isDone: false, assigneeId: "" }}
        submitLabel="Create"
      />
    </main>
  );
}
