import ReactPlayer from "react-player";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  view_count?: number;
  comment_count?: number;
  created_at: string;
}

interface VideoComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}
function VideoPage() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = (params as any)?.id as string | undefined;
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<VideoComment[]>([]);
  console.log("comments", comments);
  const [newComment, setNewComment] = useState("");

  const fetchVideo = async (id: string) => {
    try {
      const response = await fetch(`/api/videos/single?video_id=${id}`);
      const data = await response.json();
      setSelectedVideo(data.video);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchComments = async (id: string) => {
    if (!id) return;
    try {
      const response = await fetch(`/api/videos/comments?video_id=${id}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async () => {
    if (!id || !user || !newComment.trim()) return;
    try {
      const response = await fetch(`/api/videos/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_id: id,
          content: newComment.trim(),
          user_id: user.userId,
        }),
      });
      if (response.ok) {
        setNewComment("");
        fetchComments(id);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async (id: string) => {
      await fetchVideo(id);
      setLoading(false);
    };

    id && fetchData(id);
  }, []);

  useEffect(() => {
    id && fetchComments(id);
  }, [id]);

  return (
    <div className="bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <MediaController
          style={{
            width: "100%",
            aspectRatio: "16/9",
          }}
        >
          <ReactPlayer
            src={selectedVideo?.video_url}
            slot="media"
            controls={true}
            style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
          />
          <MediaControlBar>
            <MediaPlayButton />
            <MediaSeekBackwardButton seekOffset={10} />
            <MediaSeekForwardButton seekOffset={10} />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaMuteButton />
            <MediaVolumeRange />
            <MediaPlaybackRateButton />
            <MediaFullscreenButton />
          </MediaControlBar>
        </MediaController>
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-800 flex-1">
              {selectedVideo?.title}
            </h2>
          </div>
          <p className="text-gray-600 mb-6">{selectedVideo?.description}</p>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Comments ({comments.length})
            </h3>

            <div className="mb-6">
              <div className="flex space-x-2">
                <input
                  id="comment"
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="input-field"
                />
                <button
                  onClick={postComment}
                  disabled={!newComment.trim() || !user}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800 capitalize">
                      {comment.user_id.split("_").join(" ")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VideoPage;
