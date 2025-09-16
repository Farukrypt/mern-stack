require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');
const cors = require('cors');

//express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for reuests
    const PORT = process.env.PORT;
    app.listen(PORT, function () {
      console.log(`Connected to db & Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
