export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  num_comments: number;
  created_at: string;
  user_id: string;
}

export interface VideoComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface User {
  name: string;
  lastName: string;
  userId: string;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, lastName: string) => void;
  logout: () => void;
}
