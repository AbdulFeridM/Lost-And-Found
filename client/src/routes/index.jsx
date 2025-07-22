import { Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import DashboardLayout from '../components/Layout/dashboard-layout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PostItem from '../pages/PostItem';
import AdminPanel from '../pages/AdminPanel';
import LandingPage from '../pages/landing-page';
import AllItems from '../pages/_components/all-items';
import EditItem from '../pages/edit-item';
import LostItemsPage from '../pages/lost-page';
import FoundItems from '../pages/found-items';
import SettingsPage from '../pages/settings';
import ManageUsers from '../pages/manage-users';
import ManageItems from '../pages/manage-items';

const AppRoutes = (user) => {
  if (!user) {
    return (
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="all-items" element={<AllItems />} />
          <Route path="found-items" element={<FoundItems />} />
          <Route path="lost-items" element={<LostItemsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="items/edit-item/:id" element={<EditItem />} />
        </Route>

        <Route path="post-item" element={<PostItem />} />

        <Route path="admin" element={<DashboardLayout />}>
          <Route
            index
            element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}
          />
          <Route
            path="manage-users"
            element={isAdmin ? <ManageUsers /> : <Navigate to="/" />}
          />
          <Route
            path="manage-items"
            element={isAdmin ? <ManageItems /> : <Navigate to="/" />}
          />
        </Route>
      </Route>

      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  );
};

export default AppRoutes;
