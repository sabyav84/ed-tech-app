# ed-tech-app

Take home assignment for Scope Labs

## Getting Started

Clone the repository

```bash
git clone https://github.com/sabyav84/ed-tech-app.git
cd ed-tech-app
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin User

To grant admin privileges, a user must log in with:

First Name: Saban
Last Name: Yavasca

Any other name combination will be treated as a regular user. The /videos and /videos/:id routes are protected pages.

## 🧑‍💼 User Permissions

Admin User Capabilities:
✅ Upload new videos
✅ Edit any video (title and description)
✅ Comment on videos

Regular User Capabilities:
✅ Comment on videos only

## 🎥 Video Features

Video Grid: Responsive layout showing all videos
Search: Filter videos by title or description
Adjust playback speed (1x–2x)
Control volume or mute
Video Info: Shows comments and upload date

💬 Comments
Add Comments: Post with your first and last name
View Comments: See all comments with timestamps
Auto Refresh: Comments update instantly after posting

🎨 UI / UX
Modern Look: Clean indigo–purple gradient theme
Responsive: Works on desktop, tablet, and mobile
Smooth Animations: Hover, transitions, and loading effect
Better UX: Toaster messages give instant feedback on errors
