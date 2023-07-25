const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const compression = require('compression');
const cors = require('cors');
const xss = require('xss-clean');
const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');
const { connectDB, sequelize } = require('./database/db.js');
const { JobPosting } = require('./models/JobPosting.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream.write }));
app.use(compression());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/job-postings', async (req, res, next) => {
  try {
    const { title, company, fromDate, toDate, location, jobType, city, cursor } = req.query;
    const PAGE_SIZE = 100; 

    const query = {};
    if (title) query.JobTitle = title;
    if (company) query.CompanyName = company;
    if (fromDate) query.JobOpeningDate = { [Op.gte]: fromDate };
    if (toDate) query.JobOpeningDate = { [Op.lte]: toDate };
    if (city) query.City = city;
    //if (jobType) query.JobType = jobType;

    let options = {
      where: query,
      limit: PAGE_SIZE,
      order: [['JobID', 'ASC']],
    };

    if (cursor) {
      options.where.JobID = { [Op.gt]: cursor };
    }

    const jobPostings = await JobPosting.findAll(options);

    res.json(jobPostings);
  } catch (error) {
    next(error);
  }
});


app.get('/job-postings/stats', async (req, res, next) => {
  try {
    const jobCountsByCompany = await JobPosting.findAll({
      attributes: [
        'CompanyName', 
        [sequelize.fn('count', sequelize.col('JobID')), 'count'], 
      ],
      group: ['CompanyName'], 
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 100,
    });

    res.json(jobCountsByCompany);
  } catch (error) {
    next(error);
  }
});


app.get('/job-postings/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const jobDetails = await JobPosting.findOne({ where: { JobID: jobId } });

    res.json(jobDetails);
  } catch (error) {
    next(error);
  }
});



// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


