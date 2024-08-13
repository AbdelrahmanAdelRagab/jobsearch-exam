import Company from './companyModel.js';

const addCompany = async (req, res) => {
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;

  try {    // Create a new company in the database with the provided details and set the companyHR to the current user's ID

    const company = await Company.create({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR: req.user._id
    });
    // Respond with the created company data and a status of 201 (Created)


    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { addCompany };