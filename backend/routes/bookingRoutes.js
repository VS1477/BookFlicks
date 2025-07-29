import express from 'express';
import { createBooking, getOccupiedSeats, dummyBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();


bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getOccupiedSeats);
bookingRouter.post('/dummy-booking', dummyBooking);

export default bookingRouter;