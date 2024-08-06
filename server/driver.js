// Register Driver
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
    