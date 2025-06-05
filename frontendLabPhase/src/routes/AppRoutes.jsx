import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminRooms from '../pages/Admin/Rooms';
import AdminBookings from '../pages/Admin/Bookings';
import AdminUsers from '../pages/Admin/Users';
import Booking from '../pages/Booking/Booking';
import RoomBooking from '../pages/Booking/RoomBooking';

const AppRoutes = () => {
  const { user } = useAppContext();
  const isAdmin = user?.role === 'admin';

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
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/rooms" 
            element={isAdmin ? <AdminRooms /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/bookings" 
            element={isAdmin ? <AdminBookings /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/users" 
            element={isAdmin ? <AdminUsers /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes; 