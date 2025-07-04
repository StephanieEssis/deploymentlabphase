const Booking = require('../models/Booking');
const Room = require('../models/Room');

const bookingController = {
  // Create a new booking
  createBooking: async (req, res) => {
    try {
      console.log('=== CREATE BOOKING START ===');
      console.log('Request body:', req.body);
      console.log('User:', req.user);
      
      const {
        roomId,
        checkIn,
        checkOut,
        guests,
        specialRequests
      } = req.body;

      // Validate required fields
      if (!roomId || !checkIn || !checkOut || !guests) {
        console.log('Missing required fields:', { roomId, checkIn, checkOut, guests });
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      console.log('Looking for room with ID:', roomId);
      // Check if room exists
      const room = await Room.findById(roomId);
      console.log('Room found:', room);
      
      if (!room) {
        console.log('Room not found');
        return res.status(404).json({ message: 'Room not found' });
      }

      // Check if room is available
      if (!room.isAvailable) {
        console.log('Room not available');
        return res.status(400).json({ message: 'Room is not available' });
      }

      // Check if room has a valid price
      if (!room.price || room.price <= 0) {
        console.log('Invalid room price:', room.price);
        return res.status(500).json({ message: 'Server error: Cannot calculate room price due to missing data.' });
      }

      console.log('Checking room availability for dates:', { checkIn, checkOut });
      // Check if room is available for these dates
      const isAvailable = await Booking.isRoomAvailable(roomId, checkIn, checkOut);
      console.log('Room availability result:', isAvailable);
      
      if (!isAvailable) {
        console.log('Room not available for these dates');
        return res.status(400).json({ message: 'Room is not available for these dates' });
      }

      // Calculate total price
      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      const totalPrice = room.price * nights;
      console.log('Price calculation:', { nights, roomPrice: room.price, totalPrice });

      // Create booking
      const bookingData = {
        user: req.user._id,
        room: roomId,
        checkIn,
        checkOut,
        totalPrice,
        guests,
        specialRequests: specialRequests || ''
      };
      
      console.log('Creating booking with data:', bookingData);
      const booking = new Booking(bookingData);
      await booking.save();
      console.log('Booking saved successfully with ID:', booking._id);

      // Get booking with details
      const populatedBooking = await Booking.findById(booking._id)
        .populate('room')
        .populate('user', 'fullName email');

      console.log('Populated booking:', populatedBooking);
      console.log('=== CREATE BOOKING SUCCESS ===');

      res.status(201).json({
        message: 'Booking created successfully',
        booking: populatedBooking
      });
    } catch (error) {
      console.error('=== CREATE BOOKING ERROR ===');
      console.error('Error creating booking:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  },

  // Get user's bookings
  getUserBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user._id })
        .populate('room')
        .sort({ createdAt: -1 });

      res.json({
        bookings,
        count: bookings.length
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get booking by ID
  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate('room')
        .populate('user', 'fullName email');

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      // Check if user is authorized to view this booking
      if (booking.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized to view this booking' });
      }

      res.json({ booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      // Check if user is authorized to cancel this booking
      if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized to cancel this booking' });
      }

      // Check if booking can be cancelled
      if (booking.status === 'cancelled') {
        return res.status(400).json({ message: 'Booking is already cancelled' });
      }

      booking.status = 'cancelled';
      await booking.save();

      res.json({
        message: 'Booking cancelled successfully',
        booking
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all bookings (admin only)
  getAllBookings: async (req, res) => {
    try {
      const { status, startDate, endDate } = req.query;
      let filter = {};

      // Apply filters
      if (status) {
        filter.status = status;
      }
      if (startDate && endDate) {
        filter.checkIn = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }

      const bookings = await Booking.find(filter)
        .populate('room')
        .populate('user', 'fullName email')
        .sort({ createdAt: -1 });

      res.json({
        bookings,
        count: bookings.length
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update booking status (admin only)
  updateBookingStatus: async (req, res) => {
    try {
      const { status } = req.body;

      if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      booking.status = status;
      await booking.save();

      res.json({
        message: 'Booking status updated successfully',
        booking
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bookingController; 