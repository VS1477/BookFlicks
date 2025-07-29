import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import stripe from 'stripe'
import sendEmail from "../configs/nodeMailer.js";


// Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats)=>{
    try {
        const showData = await Show.findById(showId)
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const createBooking = async (req, res)=>{
    try {
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const { origin } = req.headers;

        // Check if the seat is available for the selected show
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

        if(!isAvailable){
            return res.json({success: false, message: "Selected Seats are not available."})
        }

        // Get the show details
        const showData = await Show.findById(showId).populate('movie');

        // Convert INR to USD for Stripe (approximate, 1 USD = 83 INR)
        const INR_TO_USD = 83; // Update this rate as needed
        const amountInINR = showData.showPrice * selectedSeats.length;
        const amountInUSD = Math.round((amountInINR / INR_TO_USD) * 100) / 100; // rounded to 2 decimals

        // Create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: amountInUSD, // Store USD amount for Stripe
            bookedSeats: selectedSeats
        })

        selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');

        await showData.save();

         // Stripe Gateway Initialize
         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

         // Creating line items for Stripe
         const line_items = [{
            price_data: {
                currency: 'usd',
                product_data:{
                    name: showData.movie.title
                },
                unit_amount: Math.floor(booking.amount * 100) // Stripe expects cents
            },
            quantity: 1
         }]

         const frontendUrl = process.env.FRONTEND_URL || origin; // Use env var in production, fallback to origin locally
         const session = await stripeInstance.checkout.sessions.create({
            success_url: `${frontendUrl}/loading/my-bookings`,
            cancel_url: `${frontendUrl}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
         })

         booking.paymentLink = session.url
         await booking.save()

         // Run Inngest Sheduler Function to check payment status after 10 minutes
         await inngest.send({
            name: "app/checkpayment",
            data: {
                bookingId: booking._id.toString()
            }
         })

         res.json({success: true, url: session.url})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const getOccupiedSeats = async (req, res)=>{
    try {
        
        const {showId} = req.params;
        const showData = await Show.findById(showId)

        const occupiedSeats = Object.keys(showData.occupiedSeats)

        res.json({success: true, occupiedSeats})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const dummyBooking = async (req, res) => {
  try {
    const { email = "test@example.com" } = req.body;
    
    await sendEmail({
      to: email,
      subject: "Dummy Booking Confirmation - VelVet Pass",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; text-align: center;">🎬 VelVet Pass</h2>
          <h3 style="color: #333;">Booking Confirmation</h3>
          <p>This is a <strong>test booking email</strong> from VelVet Pass!</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking ID:</strong> DUMMY-${Date.now()}</p>
            <p><strong>Movie:</strong> Test Movie</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            <p><strong>Seats:</strong> A1, A2</p>
            <p><strong>Amount:</strong> $20.00</p>
          </div>
          <p>Thank you for choosing VelVet Pass!</p>
        </div>
      `
    });
    
    res.json({ 
      success: true, 
      message: "Dummy booking email sent successfully!",
      email: email
    });
  } catch (error) {
    console.error("Dummy booking error:", error);
    res.json({ 
      success: false, 
      message: error.message 
    });
  }
};