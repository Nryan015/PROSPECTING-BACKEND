require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userInfoRoutes = require('./routes/prospectRoutes');


const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Database connection
db.sequelize.sync() // { force: true }
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use(bodyParser.json());


//uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', userInfoRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
