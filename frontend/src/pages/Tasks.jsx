import { useEffect, useState } from "react";
import api from "../api/api";
import TaskModal from "../components/TaskModal";
import { errorAlert, successAlert, confirmDelete } from "../utils/alerts";

export default function Tasks() {
  const [editingTask, setEditingTask] = useState(null);

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
    try {
      await api.post("/tasks", {
        title: data.title,
        isDone: data.isDone,
        assignedUserId: data.assigneeId,
      });

      successAlert("Task successfully created.");

      setShowModal(false);
      fetchTasks();
    } catch (err) {
      errorAlert(err.response.data || "Something went wrong while creating task.");
    }
  };

  const updateTask = async (data) => {
    try {
      await api.put(`/tasks/${editingTask.id}`, {
        title: data.title,
        isDone: data.isDone,
        assignedUserId: data.assigneeId,
      });

      successAlert("Task successfully updated.");

      setEditingTask(null);
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      if (err.response?.status === 403) {
        errorAlert(
          err.response.data ||
            "You are not allowed to update this task, because you are not the creator or assignee."
        );
      } else {
        errorAlert("Something went wrong while updating the task.");
      }
    }
  };

  const deleteTask = async (taskId) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/tasks/${taskId}`);

      successAlert("Task deleted successfully");

      fetchTasks();
    } catch (err) {
      if (err.response?.status === 403) {
        errorAlert(
          err.response.data || "You are not allowed to delete this task."
        );
      } else {
        errorAlert("Something went wrong while deleting.");
      }
    }
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
              <div className="flex justify-end gap-2">
                {/* Edit */}
                <button
                  onClick={() => {
                    setEditingTask(task);
                    setShowModal(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  title="Edit"
                >
                  ✏️
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>

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
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? updateTask : createTask}
        users={users}
        initialData={
          editingTask
            ? {
                title: editingTask.title,
                isDone: editingTask.isDone,
                assigneeId: editingTask.assignedUserId,
              }
            : { title: "", isDone: false, assigneeId: "" }
        }
        submitLabel={editingTask ? "Update" : "Create"}
      />
    </main>
  );
}
