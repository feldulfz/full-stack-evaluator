import { useEffect, useState } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  users,
  initialData = {},
  submitLabel = "Create",
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [isDone, setIsDone] = useState(initialData.isDone || false);
  const [assigneeId, setAssigneeId] = useState(initialData.assigneeId || "");

  useEffect(() => {
    setTitle(initialData.title || "");
    setIsDone(initialData.isDone || false);
    setAssigneeId(initialData.assigneeId || "");
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card w-full max-w-md p-6">
        <h3 className="text-xl font-semibold mb-4">{submitLabel} Task</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ title, isDone, assigneeId });
          }}
          className="space-y-4"
        >
          {/* Title */}
          <input
            className="input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Assignee */}
          <select
            className="input"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            required
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            className="input"
            value={String(isDone)}
            onChange={(e) => setIsDone(e.target.value === "true")}
          >
            <option value="false">Pending</option>
            <option value="true">Done</option>
          </select>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-zinc-600 hover:bg-zinc-100"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
