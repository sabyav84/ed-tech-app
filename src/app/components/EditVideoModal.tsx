import React from "react";
import { X } from "lucide-react"; // Assuming you have lucide-react for the icon

export default function EditVideoModal({
  showEditModal,
  setShowEditModal,
  editVideo,
  setEditVideo,
  updateVideo,
}: any) {
  if (!showEditModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
  );
}
