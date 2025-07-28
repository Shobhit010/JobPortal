import express from 'express';
import { changeJobApplicationStatus, getCompanyJobApplicants, getCompanyPostedJobs, getCompanyData, loginCompany, postJob, registerCompany, changeVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = express.Router()

// Register a company
router.post('/register', upload.single('image'), registerCompany)

// Company login
router.post('/login', loginCompany)

// Get compnay data
router.get('/company', protectCompany, getCompanyData)

// Post a job
router.post('/post-job', protectCompany, postJob)

// Get Applicants Data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

// Get Company Job List
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

// Change Application Status
router.post('/change-status', protectCompany,  changeJobApplicationStatus)

// Change Application Visibility
router.post('/change-visibility', protectCompany,  changeVisibility)

export default router