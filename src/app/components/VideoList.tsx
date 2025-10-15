import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, type SetStateAction } from "react";
import { Clock, Edit, MessageSquare, Play, Search, X } from "lucide-react";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Video } from "@/types";
import EditVideoModal from "@/components/EditVideoModal";
import CreateVideoModal from "@/components/CreateVideoModal";

export default function VideoList() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
    setLoading(true);
    try {
      const response = await fetch(
        `/api/videos?user_id=${process.env.NEXT_PUBLIC_ADMIN_USER_ID}`
      );
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      (window as any).showError?.(
        "Unable to fetch videos right now. Please try again later."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createVideo = async () => {
    setLoading(true);
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
      (window as any).showError?.(
        "Unable to create the video right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateVideo = async () => {
    if (!editVideo.title || !editVideo.description) return;

    setLoading(true);
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
      }
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setLoading(false);
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
    router.push(`/videos/${(video as Video)?.id as string}`);
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
              className="w-full pl-12 pr-4 py-3 border text-gray-600 border-gray-300 rounded-xl focus-visible:border focus-visible:border-indigo-500 focus:border-2 focus:border-indigo-500 shadow-sm"
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

      <CreateVideoModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        newVideo={newVideo}
        setNewVideo={setNewVideo}
        createVideo={createVideo}
      />

      <EditVideoModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editVideo={editVideo}
        setEditVideo={setEditVideo}
        updateVideo={updateVideo}
      />
    </div>
  );
}
