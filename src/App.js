import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./container/Home";
// import EditNotes from "./container/EditNotes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import { useGetUser } from "./contexts/User";
import { REACT_APP_GOOGLE_CLIENT_ID } from "./utils/config";

const App = () => {
  const clientId = REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <AppRoutes/>
      </Router>
    </GoogleOAuthProvider>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const { user } = useGetUser();

  useEffect(() => {
    document.cookie = "cookieName=cookieValue; SameSite=None; Secure";
  });

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
