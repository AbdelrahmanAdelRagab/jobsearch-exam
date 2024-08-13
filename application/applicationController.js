import Application from './applicationModel.js';

const applyToJob = async (req, res) => {
  const { jobId, userTechSkills, userSoftSkills, userResume } = req.body;

  try {
    const application = await Application.create({
      jobId,
      userId: req.user._id,
      userTechSkills,
      userSoftSkills,
      userResume
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { applyToJob };