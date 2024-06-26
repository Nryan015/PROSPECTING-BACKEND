const multer = require('multer');
const { Prospect } = require('../models/prospectModel');
const db = require('../models/index');


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB limit
  },
  fileFilter: fileFilter
});

const ProspectController = {
  // Create prospect
  createProspect: async (req, res) => {
      const {
          companyName,
          contactName,
          position,
          city,
          specificAddress,
          mobileNumber,
          telephone1,
          telephone2,
          supplier,
          volume,
          salesAgent,
          prospectEmail,
      } = req.body;

      // Check if any required fields are missing in the request body
      const requiredFields = ['companyName', 'contactName', 'position', 'city', 'specificAddress', 'mobileNumber', 'telephone1', 'telephone2', 'supplier', 'volume', 'salesAgent', 'prospectEmail'];
      const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

      if (missingFields.length > 0) {
          return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
      }

      const image = req.file ? req.file.filename : null;

      db.ProspectInfo.create({
          companyName,
          contactName,
          position,
          city,
          specificAddress,
          mobileNumber,
          telephone1,
          telephone2,
          supplier,
          volume,
          salesAgent,
          prospectEmail,
          image,
      }).then(prospect => {
          res.status(201).json(prospect);
      }).catch(error => {
          console.error('Error creating prospect:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Get all prospects
  getAllProspects: async (req, res) => {
      db.ProspectInfo.findAll().then(prospects => {
          res.status(200).json(prospects);
      }).catch(error => {
          console.error('Error getting all prospects:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Get prospect by ID
  getProspectById: async (req, res) => {
      const { id } = req.params;

      db.ProspectInfo.findByPk(id).then(prospect => {
          if (!prospect) {
              return res.status(404).json({ error: 'Prospect not found' });
          }
          res.status(200).json(prospect);
      }).catch(error => {
          console.error('Error getting prospect by ID:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Update prospect by ID
  updateProspectById: async (req, res) => {
      const { id } = req.params;

      db.ProspectInfo.findByPk(id).then(prospect => {
          if (!prospect) {
              return res.status(404).json({ error: 'Prospect not found' });
          }
          return prospect.update(req.body);
      }).then(updatedProspect => {
          res.status(200).json({ message: 'Prospect updated successfully', updatedProspect });
      }).catch(error => {
          console.error('Error updating prospect by ID:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Delete prospect by ID
  deleteProspectById: async (req, res) => {
      const { id } = req.params;

      db.ProspectInfo.findByPk(id).then(prospect => {
          if (!prospect) {
              return res.status(404).json({ error: 'Prospect not found' });
          }
          return prospect.destroy();
      }).then(() => {
          res.status(200).json({ message: 'Prospect deleted successfully' });
      }).catch(error => {
          console.error('Error deleting prospect by ID:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  },
};

  
  module.exports = ProspectController;
  