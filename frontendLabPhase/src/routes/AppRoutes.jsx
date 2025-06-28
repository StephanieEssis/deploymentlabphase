import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages publiques
import Home from '../pages/Home/Home';
import RoomList from '../pages/Room/RoomList';
import RoomDetail from '../pages/Room/RoomDetail';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound';

// Pages protégées
import BookingForm from '../pages/Booking/BookingForm';
import BookingList from '../pages/Booking/BookingList';
import BookingDetail from '../pages/Booking/BookingDetail';

// Pages admin
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminRooms from '../pages/Admin/Rooms';
import AdminBookings from '../pages/Admin/Bookings';
import AdminUsers from '../pages/Admin/Users';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/rooms/:id" element={<RoomDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées */}
      <Route
        path="/bookings/new/:roomId"
        element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <BookingList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute>
            <BookingDetail />
          </ProtectedRoute>
        }
      />

      {/* Routes admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoute requireAdmin>
            <AdminRooms />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute requireAdmin>
            <AdminBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requireAdmin>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 