import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LostItems from "./pages/LostItems.jsx";
import FoundItems from "./pages/FoundItems.jsx";
import PostLost from "./pages/PostLost.jsx";
import PostFound from "./pages/PostFound.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import Admin from "./pages/Admin.jsx";
import Claims from "./pages/Claims.jsx";
import AuthSuccess from "./pages/AuthSuccess.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost"
        element={
          <ProtectedRoute>
            <LostItems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/found"
        element={
          <ProtectedRoute>
            <FoundItems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-lost"
        element={
          <ProtectedRoute>
            <PostLost />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-found"
        element={
          <ProtectedRoute>
            <PostFound />
          </ProtectedRoute>
        }
      />

      <Route
        path="/item/:id"
        element={
          <ProtectedRoute>
            <ItemDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/myposts"
        element={
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/claims"
        element={
          <Claims />
        }
      />

      <Route
        path="/auth-success"
        element={<AuthSuccess />}
      />

      <Route
        path="*"
        element={
          <h1
            style={{
              padding: "100px",
              textAlign: "center"
            }}
          >
            404 Page Not Found
          </h1>
        }
      />

    </Routes>

  )

}

export default App;