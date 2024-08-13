import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userTechSkills: [{ type: String }],
  userSoftSkills: [{ type: String }],
  userResume: { type: String, required: true }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;