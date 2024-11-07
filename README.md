# NotesApp 📝

A simple note-taking application where users can create accounts, manage their notes, and organize them with tags and pins. Built with MongoDB, Express, React, and Node.js.

## Features
- User authentication (signup/login)
- Create and manage personal notes
- Tag notes for organization
- Pin important notes to top
- Search functionality
- Responsive design

## Project Structure
```
NotesApp/
├── backend/
├── ├── models/    # Server with Express & MongoDB
│   ├── config.json
│   ├── index.js
│   └── utilities.js
└── notesApp/              # React + Vite frontend
    └── src/
        ├── components/    
        ├── pages/         
        ├── utils/         
        └── App.jsx        
```

## Setup Instructions

1. **Clone & Install**
```bash
# Clone repository
git clone https://github.com/sanjanaynvsdl/NoteKeeper.git

# Install dependencies
cd backend
npm install
cd notesApp
npm install
```

2. **Environment Setup**
```bash
# Backend .env
ACCESS_TOKEN_SECRET=your_jwt_secret_key
MONGO_DB_URL=your_mongodb_connection_string
FRONTEND_URLS=http://localhost:5173

# Start servers
cd backend
npm start
cd ../notesApp
npm run dev
```

## API Endpoints

- `GET /` - Test API
- `POST /create-account` - Register user
- `POST /login` - User login
- `GET /get-user` - Fetch user info
- `GET /get-all-notes` - Fetch all notes
- `GET /search-notes` - Search notes
- `PUT /update-note-pinned/:id` - Toggle pin
- `DELETE /delete-note/:id` - Remove note

##  Deployment

1. **Backend**: Deploy to Vercel/Heroku
   - Set environment variables
   - Configure MongoDB connection

2. **Frontend**: Deploy to Vercel/Netlify
   - Update API URL in environment
   - Configure build settings

## Usage Guide

1. Open http://localhost:5173
2. Create account/login
3. Access dashboard to:
   - Create new notes
   - Edit existing notes
   - Pin important notes
   - Search using keywords
   - Tag notes for organization
