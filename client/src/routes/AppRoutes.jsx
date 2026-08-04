import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import LostItems from "../pages/LostItems/LostItems";
import FoundItems from "../pages/FoundItems/FoundItems";
import PostLost from "../pages/PostLost/PostLost";
import PostFound from "../pages/PostFound/PostFound";
import ItemDetails from "../pages/ItemDetails/ItemDetails";
import ClaimItem from "../pages/ClaimItem/ClaimItem";
import MyPosts from "../pages/MyPosts/MyPosts";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages/Messages";
import Logout from "../pages/Logout/Logout";

import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import PendingPosts from "../pages/PendingPosts/PendingPosts";
import PendingClaims from "../pages/PendingClaims/PendingClaims";
import ReportedPosts from "../pages/ReportedPosts/ReportedPosts";
import UserManagement from "../pages/UserManagement/UserManagement";
import Analytics from "../pages/Analytics/Analytics";


function AppRoutes() {

  return (

    <Routes>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/lost-items" element={<LostItems />} />
      <Route path="/found-items" element={<FoundItems />} />
      <Route path="/post-lost" element={<PostLost />} />
      <Route path="/post-found" element={<PostFound />} />
      <Route path="/claim-item/:id" element={<ClaimItem />} />
      <Route path="/item/:type/:id" element={<ItemDetails />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<AdminDashboard />} />
        <Route path="pending-posts" element={<PendingPosts />} />
        <Route path="pending-claims" element={<PendingClaims />} />
        <Route path="reported-posts" element={<ReportedPosts />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="analytics" element={<Analytics />} />

      </Route>

    </Routes>

  );

}

export default AppRoutes;