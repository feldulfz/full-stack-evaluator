export default function Navbar({ user, onNavigate, onLogout }) {
  return (
    <div className="sticky top-4 z-50 px-4">
      <nav className="relative max-w-6xl mx-auto card px-6 py-4 flex justify-between items-center">
        <div
          className="absolute top-0 left-0 right-0 h-[2px]
          bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 rounded-t-2xl"
        />

        <span className="font-semibold tracking-tight text-indigo-700">
          {user ? user.email : "TaskFlow"}
        </span>

        <div className="flex gap-3 items-center">
          {!user && (
            <>
              <button
                onClick={() => onNavigate("login")}
                className="text-zinc-600 hover:text-black"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("register")}
                className="btn-primary"
              >
                Register
              </button>
            </>
          )}

          {user && (
            <button
              onClick={onLogout}
              className="py-2 px-4 text-rose-500 font-medium hover:text-rose-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
