import Job from './jobModel.js';

const addJob = async (req, res) => {
  const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, company } = req.body;

  try {
    const job = await Job.create({
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
      addedBy: req.user._id,
      company
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { addJob };