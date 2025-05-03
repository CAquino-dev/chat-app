// controllers/projectController.js
const db = require('../config/db');  // Importing the MySQL connection

// Function to calculate the project estimate
const calculateEstimate = async (data) => {
    const { projectType, materialType, size, location } = data;
  
    try {
      // Query to get the base cost from project_types based on the project type
      const [projectTypeRows] = await db.promise().query(
        'SELECT base_cost FROM project_types WHERE project_type = ?', [projectType]
      );
  
      // Query to get the cost factor from materials based on the material type
      const [materialRows] = await db.promise().query(
        'SELECT cost_factor FROM materials WHERE material_type = ?', [materialType]
      );
  
      // Query to get the cost factor from sizes based on the selected size
      const [sizeRows] = await db.promise().query(
        'SELECT cost_factor FROM sizes WHERE size = ?', [size]
      );
  
      // Query to get the cost factor from locations based on the selected location
      const [locationRows] = await db.promise().query(
        'SELECT cost_factor FROM locations WHERE location = ?', [location]
      );
  
      // If any of the rows are not found, return an error
      if (projectTypeRows.length === 0 || materialRows.length === 0 || sizeRows.length === 0 || locationRows.length === 0) {
        throw new Error('Invalid input data');
      }
  
      // Retrieve the individual cost factors and convert them to numbers
      const baseCost = parseFloat(projectTypeRows[0].base_cost);
      const materialCostFactor = parseFloat(materialRows[0].cost_factor);
      const sizeCostFactor = parseFloat(sizeRows[0].cost_factor);
      const locationCostFactor = parseFloat(locationRows[0].cost_factor);
  
      // Calculate the total cost
      const totalCost = baseCost + materialCostFactor + sizeCostFactor + locationCostFactor;
  
      // Return the calculated total cost
      return totalCost;
  
    } catch (error) {
      throw new Error(`Error calculating estimate: ${error.message}`);
    }
  };
  

// Controller function to handle the API request for calculating the project estimate
const getEstimate = async (req, res) => {
  const { projectType, materialType, size, location } = req.body;
  try {
    // Call the calculateEstimate function and get the estimated cost
    const estimate = await calculateEstimate({ projectType, materialType, size, location });

    // Send the estimate as the response
    res.json({ estimate });

  } catch (error) {
    // Handle any errors that occur during the estimate calculation
    res.status(500).json({ message: 'Error calculating estimate', error: error.message });
  }
};

module.exports = { getEstimate };
