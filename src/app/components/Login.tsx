import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function Login() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      console.log("Logged in");
    }
  }, [user, router]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(name.trim(), lastName.trim());
    console.log("Logged in");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 ">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl inline-block mb-4">
              <Play
                className="w-12 h-12 text-white"
                fill="white"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              EdTech
            </h1>
            <p className="text-gray-600">Please log in to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-label">First Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                className="input-field capitalize"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="text-label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field capitalize"
                placeholder="Enter your last name"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !lastName.trim()}
              className="main-button"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
