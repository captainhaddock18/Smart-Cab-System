const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3002;
const cors = require('cors')

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://smartcabsystem:Pass12345@cluster0.r3uivcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});
 
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Trip Schema
// const tripSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   origin: String,
//   destination: String,
//   time: String,
//   cost: Number,
//   status: String // pending, completed, cancelled
// });
const tripSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  origin: String,
  destination: String,
  time: String,
  cost: Number,
  status: String 
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
  const token = authHeader && authHeader.split(' ')[1]; 
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
app.post('/trips', authenticate, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const trip = new Trip({
    userId: user._id,
    origin: req.body.origin,
    destination: req.body.destination,
    cost: calculateCost(req.body.origin, req.body.destination),
    time: req.body.time,
    status: 'pending',
    driverId: null // Initially no driver assigned
  });

  try {
    const savedTrip = await trip.save();
    res.send(savedTrip);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/trips/:id/assign', authenticate, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    if (trip.status !== 'pending') {
      return res.status(400).send('Trip is not available for assignment');
    }

    trip.driverId = req.user._id; // Assuming the driver is authenticated
    trip.status = 'assigned'; // You might have a specific status for assigned trips

    const updatedTrip = await trip.save();
    res.send(updatedTrip);
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
// function toRadians(degrees) {
//   return degrees * (3.141592653589793 / 180.0); // Using π approximation
// }

// function sin(x) {
//   // Using Taylor series for small angles approximation
//   let x2 = x * x;
//   let term = x;
//   let sum = term;
//   let factorial = 1;
//   for (let i = 1; i <= 5; i++) {
//       factorial *= (2 * i) * (2 * i + 1);
//       term *= -x2 / factorial;
//       sum += term;
//   }
//   return sum;
// }

// function cos(x) {
//   // Using Taylor series for small angles approximation
//   let x2 = x * x;
//   let term = 1;
//   let sum = term;
//   let factorial = 1;
//   for (let i = 1; i <= 5; i++) {
//       factorial *= (2 * i - 1) * (2 * i);
//       term *= -x2 / factorial;
//       sum += term;
//   }
//   return sum;
// }

// function sqrt(x) {
//   // Using Newton's method for square root
//   if (x < 0) return NaN;
//   let guess = x;
//   let epsilon = 0.000001;
//   while (Math.abs(guess * guess - x) > epsilon) {
//       guess = (guess + x / guess) / 2;
//   }
//   return guess;
// }


// function atan2(y, x) {
//   // Using Taylor series for small angles approximation
//   let absX = Math.abs(x);
//   let absY = Math.abs(y);
//   let angle;
//   if (absX >= absY) {
//       let r = y / x;
//       angle = (absY / absX) * (1 + r * r / 3) / (1 + r * r / 3 + (1 - r * r / 3) * (r * r / 3));
//       if (x < 0) {
//           angle = Math.PI - angle;
//       }
//   } else {
//       let r = x / y;
//       angle = (absX / absY) * (1 + r * r / 3) / (1 + r * r / 3 + (1 - r * r / 3) * (r * r / 3));
//       if (y < 0) {
//           angle = -angle;
//       }
//   }
//   return angle;
// }
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

app.post('/drivers/register', async (req, res) => {
  const { username, password, vehicleNumber } = req.body;

  if (!username || !password || !vehicleNumber) {
    return res.status(400).send('Username, password, and vehicle number are required');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const driver = new Driver({
      username,
      password: hashedPassword,
      vehicleNumber,
    });

    const savedDriver = await driver.save();
    res.send(savedDriver);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Login Driver
app.post('/drivers/login', async (req, res) => {
  const { username, password } = req.body;
  
  const driver = await Driver.findOne({ username });
  if (!driver) return res.status(400).send('Username or password is wrong');

  const validPass = await bcrypt.compare(password, driver.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: driver._id, type: 'driver' }, 'secretKey');
  res.header('Authorization', token).send(token);
});


// Get Driver's Bookings
app.get('/drivers/bookings', authenticate, async (req, res) => {
  if (req.user.type !== 'driver') return res.status(403).send('Access denied');

  try {
    const trips = await Trip.find({ driverId: req.user._id });
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Cancel Booking
app.put('/drivers/bookings/:id/cancel', authenticate, async (req, res) => {
  if (req.user.type !== 'driver') return res.status(403).send('Access denied');

  try {
    const updatedTrip = await Trip.updateOne(
      { _id: req.params.id, driverId: req.user._id, status: 'pending' },
      { $set: { status: 'cancelled' } }
    );
    res.send(updatedTrip);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Driver Profile
app.put('/drivers/profile', authenticate, async (req, res) => {
  if (req.user.type !== 'driver') return res.status(403).send('Access denied');

  const { vehicleNumber, rating } = req.body;

  try {
    const updatedDriver = await Driver.updateOne(
      { _id: req.user._id },
      { $set: { vehicleNumber, rating } }
    );
    res.send(updatedDriver);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Get All Drivers
app.get('/drivers', authenticate, async (req, res) => {
  if (req.user.type !== 'admin') return res.status(403).send('Access denied');

  try {
    const drivers = await Driver.find();
    res.send(drivers);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get('/trips/available', authenticate, async (req, res) => {
  try {
    const trips = await Trip.find({ status: 'pending', driverId: null });
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.put('/trips/:id/assign', authenticate, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    if (trip.status !== 'pending') {
      return res.status(400).send('Trip is not available for assignment');
    }

    trip.driverId = req.user._id; // Assuming the driver is authenticated
    trip.status = 'assigned'; // You might have a specific status for assigned trips

    const updatedTrip = await trip.save();
    res.send(updatedTrip);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get('/drivers/bookings', authenticate, async (req, res) => {
  try {
    const trips = await Trip.find({ driverId: req.user._id, status: 'assigned' });
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
});
 
app.get('/drivers/available-trips', authenticate, async (req, res) => {
  try {
    const trips = await Trip.find({ status: 'pending' });
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
