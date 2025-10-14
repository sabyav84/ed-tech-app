import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Play, Plus, LogOut } from "lucide-react";

export default function Header({
  setShowCreateModal,
}: {
  setShowCreateModal: any;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
              <Play
                className="w-8 h-8 text-white"
                fill="white"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduStream
              </h1>
              {user?.name && user?.lastName && (
                <p className="text-sm text-gray-500 capitalize">
                  Welcome, {user.name} {user.lastName}
                  {user.isAdmin && (
                    <span className="ml-2 text-indigo-600 font-semibold">
                      (Admin)
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user?.isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Upload Video</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
