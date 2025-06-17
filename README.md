# Real-time Voting System

A real-time voting system for internal suggestions built with FastAPI and React. This application allows users to submit suggestions and vote on them with live updates across all connected clients.

## Features

- **Real-time Updates**: Live voting updates using WebSockets
- **Suggestion Management**: Create and view suggestions
- **Voting System**: Vote/unvote on suggestions with instant feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Connection Status**: Visual indicator of WebSocket connection status
- **Clean Architecture**: Well-organized codebase with separation of concerns

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **WebSockets**: Real-time bidirectional communication
- **SQLite**: Lightweight database for data persistence
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server implementation

### Frontend
- **React**: UI library for building user interfaces
- **Custom Hooks**: Reusable logic for WebSocket and voting functionality
- **CSS3**: Modern styling with responsive design
- **Fetch API**: HTTP client for API communication

## Project Structure

```
Real-time Voting System_FastAPI_React/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py          # Pydantic models
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   ├── connection.py       # Database connection management
│   │   │   └── operations.py       # Database operations
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── routes.py           # API endpoints
│   │   ├── websocket/
│   │   │   ├── __init__.py
│   │   │   └── manager.py          # WebSocket connection manager
│   │   └── config/
│   │       ├── __init__.py
│   │       └── settings.py         # Application settings
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SuggestionForm.jsx  # Form component for creating suggestions
│   │   │   ├── SuggestionList.jsx  # List component for displaying suggestions
│   │   │   ├── SuggestionItem.jsx  # Individual suggestion component
│   │   │   └── ConnectionStatus.jsx # WebSocket connection status
│   │   ├── hooks/
│   │   │   ├── useWebSocket.js     # WebSocket custom hook
│   │   │   └── useVoting.js        # Voting logic custom hook
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── utils/
│   │   │   └── helpers.js          # Utility functions
│   │   ├── App.js                  # Main App component
│   │   ├── App.css                 # Application styles
│   │   └── index.js                # React entry point
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   # For WebSocket support (required for real-time updates):
   pip install "uvicorn[standard]"
   # Or, if you already have Uvicorn, install websockets:
   pip install websockets
   ```

4. **Run the backend server:**
   ```bash
   python -m app.main
   # or
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### REST API
- `GET /api/suggestions` - Get all suggestions with vote counts
- `POST /api/suggestions` - Create a new suggestion
- `POST /api/vote` - Vote/unvote on a suggestion
<!-- - `GET /api/health` - Health check endpoint -->

### WebSocket
- `WS /ws` - WebSocket endpoint for real-time updates

## Usage

1. **Start both backend and frontend servers**
2. **Open your browser to `http://localhost:3000`**
3. **Submit suggestions using the form**
4. **Vote on suggestions by clicking the vote button**
5. **Open multiple browser tabs to see real-time updates**

## Features in Detail

### Real-time Updates
The application uses WebSockets to provide instant updates when:
- New suggestions are created
- Votes are added or removed
- Connection status changes

### Vote Management
- Users can vote or unvote on suggestions
- Each user is identified by a unique session ID
- Vote counts are updated in real-time across all clients

### Connection Management
- Automatic reconnection on connection loss
- Visual connection status indicator
- Graceful handling of network interruptions

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly buttons and interactions

## Development

### Backend Development
- Add new API endpoints in `app/api/routes.py`
- Extend database operations in `app/database/operations.py`
- Modify WebSocket behavior in `app/websocket/manager.py`
- Update configuration in `app/config/settings.py`

### Frontend Development
- Create new components in `src/components/`
- Add custom hooks in `src/hooks/`
- Extend API service in `src/services/api.js`
- Add utility functions in `src/utils/helpers.js`

## Deployment

### Backend Deployment
1. Set environment variables for production
2. Use a production ASGI server (e.g., Gunicorn with Uvicorn workers)
3. Configure database for production use
4. Set up reverse proxy (Nginx) if needed

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve static files using a web server
3. Update API base URL for production

## Troubleshooting

### WebSocket Not Working / 404 on `/ws`
If you see errors like `No supported WebSocket library detected` or `404 Not Found` when connecting to `/ws`, make sure you have installed a WebSocket library:

```bash
pip install "uvicorn[standard]"
# or
pip install websockets
```

Then restart your backend server. This is required for FastAPI to support WebSocket connections.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
