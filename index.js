const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://kumaraaman167:amankumar@cluster0.gdlbrp1.mongodb.net/tender", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  
// API Creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Models
const Tender = mongoose.model('Tender', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bufferTime: { type: Number, required: true },
}));

const Bid = mongoose.model('Bid', new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  companyName: { type: String, required: true },
  bidTime: { type: Date, required: true, default: Date.now },
  cost: { type: Number, required: true },
}));

// Create a new tender
app.post('/tenders', async (req, res) => {
  const { name, description, startTime, endTime, bufferTime } = req.body;
  const newTender = new Tender({ name, description, startTime, endTime, bufferTime });

  try {
    const savedTender = await newTender.save();
    res.json(savedTender);
  } catch (err) {
    console.error('Error saving tender:', err);
    res.status(500).send(err);
  }
});

// Get all tenders
app.get('/tenders', async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    console.error('Error getting tenders:', err);
    res.status(500).send(err);
  }
});

// Submit a bid
app.post('/tenders/:id/bids', async (req, res) => {
  const { id } = req.params;
  const { cost } = req.body;
  const newBid = new Bid({ tenderId: id, cost, companyName: 'Company A', bidTime: new Date() });

  try {
    const savedBid = await newBid.save();
    const tender = await Tender.findById(id);
    const timeDifference = new Date(tender.endTime) - new Date(savedBid.bidTime);
    if (timeDifference <= 5 * 60 * 1000) {
      tender.endTime = new Date(tender.endTime.getTime() + tender.bufferTime * 60 * 1000);
      await tender.save();
    }
    res.json(savedBid);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all bids
app.get('/bids', async (req, res) => {

    const bids = await Bid.find().sort({ cost: 1 });
    res.json(bids);
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on port " + port);
  } else {
    console.log("Error:" + error);
  }
});
