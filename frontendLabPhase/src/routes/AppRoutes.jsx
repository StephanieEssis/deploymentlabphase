import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminRooms from '../pages/Admin/Rooms';
import AdminBookings from '../pages/Admin/Bookings';
import AdminUsers from '../pages/Admin/Users';
import Booking from '../pages/Booking/Booking';
import RoomBooking from '../pages/Booking/RoomBooking';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<RoomBooking />} />
          
          {/* Routes Admin */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/rooms" 
            element={
              <AdminRoute>
                <AdminRooms />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/bookings" 
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes; 