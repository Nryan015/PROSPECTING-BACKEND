const express = require('express');
const router = express.Router();
const ProspectController = require('../controllers/prospectControllers');

// Create a new prospect
router.post('/prospects', ProspectController.createProspect);

// Get all prospects
router.get('/prospects', ProspectController.getAllProspects);

// Get a prospect by ID
router.get('/prospects/:id', ProspectController.getProspectById);

// Update a prospect by ID
router.put('/prospects/:id', ProspectController.updateProspectById);

// Delete a prospect by ID
router.delete('/prospects/:id', ProspectController.deleteProspectById);

module.exports = router;
