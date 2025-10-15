import React from "react";
import { X } from "lucide-react";

export default function CreateVideoModal({
  showCreateModal,
  setShowCreateModal,
  newVideo,
  setNewVideo,
  createVideo,
}: any) {
  if (!showCreateModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upload New Video</h2>
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
              !newVideo.title || !newVideo.description || !newVideo.video_url
            }
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
}
