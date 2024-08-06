const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3002;
const cors = require('cors')
// Middleware to parse JSON bodies

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://smartcabsystem:Pass12345@cluster0.r3uivcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
  // Start your server after the database connection is established
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});
// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Trip Schema
const tripSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  origin: String,
  destination: String,
  time: String,
  cost: Number,
  status: String // pending, completed, cancelled
});


const driverSchema = new mongoose.Schema({
  username: String,
  password: String,
  vehicleNumber: String,
  rating: { type: Number, default: 0 }
});



const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Driver = mongoose.model('Driver', driverSchema);

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'secretKey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};


// Register User
app.post('/register', async (req, res) => {
  console.log(req);
  const { username, password } = req.query;

  // Validate that username and password are provided
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login User
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user) return res.status(400).send('Username or password is wrong');

  const validPass = await bcrypt.compare(req.query.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, 'secretKey');
  console.log("Password Correct!");
  res.header('Authorization', token).send(token);
});

// Create Trip
app.post('/trips', authenticate , async (req, res) => {
  console.log(req);
  const trip = new Trip({

    userId: await User.findOne({ username: req.body.username }),
    origin: req.body.origin,
    destination: req.body.destination,
    cost: calculateCost(req.body.origin, req.body.destination),
    time: req.body.time,
    status: 'pending'
  });

  try {
    const savedTrip = await trip.save();
    res.send(savedTrip);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get('/user-id', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });
    if (!user) return res.status(404).send('User not found');

    res.send({ userId: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get User's Trips
app.get('/trips', authenticate, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id });
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
});
function toRadians(degrees) {
  return degrees * (3.141592653589793 / 180.0); // Using π approximation
}

function sin(x) {
  // Using Taylor series for small angles approximation
  let x2 = x * x;
  let term = x;
  let sum = term;
  let factorial = 1;
  for (let i = 1; i <= 5; i++) {
      factorial *= (2 * i) * (2 * i + 1);
      term *= -x2 / factorial;
      sum += term;
  }
  return sum;
}

function cos(x) {
  // Using Taylor series for small angles approximation
  let x2 = x * x;
  let term = 1;
  let sum = term;
  let factorial = 1;
  for (let i = 1; i <= 5; i++) {
      factorial *= (2 * i - 1) * (2 * i);
      term *= -x2 / factorial;
      sum += term;
  }
  return sum;
}

function sqrt(x) {
  // Using Newton's method for square root
  if (x < 0) return NaN;
  let guess = x;
  let epsilon = 0.000001;
  while (Math.abs(guess * guess - x) > epsilon) {
      guess = (guess + x / guess) / 2;
  }
  return guess;
}


function atan2(y, x) {
  // Using Taylor series for small angles approximation
  let absX = Math.abs(x);
  let absY = Math.abs(y);
  let angle;
  if (absX >= absY) {
      let r = y / x;
      angle = (absY / absX) * (1 + r * r / 3) / (1 + r * r / 3 + (1 - r * r / 3) * (r * r / 3));
      if (x < 0) {
          angle = Math.PI - angle;
      }
  } else {
      let r = x / y;
      angle = (absX / absY) * (1 + r * r / 3) / (1 + r * r / 3 + (1 - r * r / 3) * (r * r / 3));
      if (y < 0) {
          angle = -angle;
      }
  }
  return angle;
}
// Trip Cost Calculation (Efficient Algorithm)
const calculateCost = (coorda,coordb, costPerKm = 15) => {
  // let coord1 = parseInt(coorda);
  // let coord2 = parseInt(coordb);
  // const R = 6371.0; // Radius of the Earth in kilometers
  // const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180.0;
  // const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180.0;

  // const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //           Math.cos(coord1.latitude * Math.PI / 180.0) * Math.cos(coord2.latitude * Math.PI / 180.0) *
  //           Math.sin(dLon / 2) * Math.sin(dLon / 2);
  // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // const distance = R * c; // Distance in kilometers
  // return +c;

  // Calculate cost based on distance
  // const cost = distance * costPerKm;
  // return cost;
  // return +coord1/;
  const R = 6371.0; /// Earth's radius in kilometers

  // let dLat = toRadians(coord2.latitude - coord1.latitude);
  // let dLon = toRadians(coord2.longitude - coord1.longitude);

  // let lat1 = toRadians(coord1.latitude);
  // let lat2 = toRadians(coord2.latitude);

  // let a = sin(dLat / 2) * sin(dLat / 2) +
  //         cos(lat1) * cos(lat2) *
  //         sin(dLon / 2) * sin(dLon / 2);
  // let c = 2 * atan2(sqrt(a), sqrt(1 - a));

  // return R * c;
  return  Math.floor(Math.random() * (1000 - 100) + 100) / 100;
};


// Update Trip Status
app.put('/trips/:id', authenticate, async (req, res) => {
  try {
    const updatedTrip = await Trip.updateOne(
      { _id: req.params.id, userId: req.user._id },
      { $set: { status: req.body.status } }
    );
    res.send(updatedTrip);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
