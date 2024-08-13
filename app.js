import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './user/userRoutes.js';
import companyRoutes from './company/companyRoutes.js';
import jobRoutes from './job/jobRoutes.js';
import applicationRoutes from './application/applicationRoutes.js';

dotenv.config();  // load environment variables from a .env file

connectDB();

const app = express();

app.use(express.json());

app.use('/jobfinder/users', userRoutes);
app.use('/jobfinder/companies', companyRoutes);
app.use('/jobfinder/jobs', jobRoutes);
app.use('/jobfinder/applications', applicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);

//testing 
console.log("Ac-Milan ");
