import { useState } from "react";
import api from "../api/api";
import { errorAlert, successAlert } from "../utils/alerts";

export default function Register({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      successAlert("Account created successfully!");

      onSuccess(res.data);
    } catch (err) {
      errorAlert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="mt-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="card p-10 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-semibold text-center">Create account</h1>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
