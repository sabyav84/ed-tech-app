import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, type SetStateAction } from "react";
import { Clock, Edit, MessageSquare, Play, Search, X } from "lucide-react";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  num_comments: number;
  created_at: string;
  user_id: string;
}

export default function VideoList() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  const [editVideo, setEditVideo] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `/api/videos?user_id=${process.env.NEXT_PUBLIC_ADMIN_USER_ID}`
      );
      const data = await response.json();
      setVideos(data.videos || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  const createVideo = async () => {
    if (!newVideo.title || !newVideo.description || !newVideo.video_url) return;

    try {
      const response = await fetch(`/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.userId,
          title: newVideo.title,
          description: newVideo.description,
          video_url: newVideo.video_url,
        }),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewVideo({ title: "", description: "", video_url: "" });
        fetchVideos();
      }
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

  const updateVideo = async () => {
    if (!editVideo.title || !editVideo.description) return;

    try {
      const response = await fetch(`/api/videos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_id: editVideo.id,
          title: editVideo.title,
          description: editVideo.description,
        }),
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditVideo({ id: "", title: "", description: "" });
        fetchVideos();
        if (selectedVideo && selectedVideo.id === editVideo.id) {
          setSelectedVideo({ ...selectedVideo, ...editVideo });
        }
      }
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const openEditModal = (video: Video) => {
    setEditVideo({
      id: video.id,
      title: video.title,
      description: video.description,
    });
    setShowEditModal(true);
  };

  const openVideo = (video: SetStateAction<Video | null>) => {
    if (!video) return;
    setSelectedVideo(video);
    router.push(`/videos/${(video as any)?.id as string}`);
  };

  const filteredVideos = videos.filter(
    (video: Video) =>
      video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || loading) return <Loader />;

  return (
    <div className="bg-white">
      <Header setShowCreateModal={setShowCreateModal} />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="search"
              placeholder="Search videos by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border text-gray-600 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Video List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div
                className="relative bg-gradient-to-br from-indigo-500 to-purple-600 h-48 flex items-center justify-center cursor-pointer"
                onClick={() => openVideo(video)}
              >
                <Play
                  className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform"
                  fill="white"
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {video.num_comments > 1
                        ? `${video.num_comments} comments`
                        : `${video.num_comments} comment`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(video.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {user?.isAdmin && (
                  <div className="flex space-x-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        openEditModal(video);
                      }}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No videos found matching your search.
            </p>
          </div>
        )}
      </main>
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Upload New Video
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  id="create-title"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="create-description"
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                  placeholder="Describe your video"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  id="create-url"
                  value={newVideo.video_url}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, video_url: e.target.value })
                  }
                  className="input-field"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
              <button
                onClick={createVideo}
                disabled={
                  !newVideo.title ||
                  !newVideo.description ||
                  !newVideo.video_url
                }
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Video</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  id="update-title"
                  value={editVideo.title}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="update-description"
                  value={editVideo.description}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, description: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                  placeholder="Describe your video"
                />
              </div>
              <button
                onClick={updateVideo}
                disabled={!editVideo.title || !editVideo.description}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
