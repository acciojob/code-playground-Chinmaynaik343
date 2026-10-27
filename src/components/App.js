
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import "./../styles/App.css";

function PrivateRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Login({ onLogin, isAuthenticated }) {
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div>
      <h2>Login Page</h2>
      <p>Please log in to access the Code Playground.</p>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}

function Home({ onLogout }) {
  return (
    <div>
      <h1>Code Playground</h1>
      <p>Welcome to the Code Playground!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="main-container">
      <nav>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/">Code Playground</Link>
      </nav>

      <p>
        Authentication Status:{" "}
        {isAuthenticated ? "Logged In" : "Not Logged In"}
      </p>

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
