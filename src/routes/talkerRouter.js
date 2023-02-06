// src/routes/peopleRoutes.js

const express = require('express');

const router = express.Router();

const { readTalkerData } = require('../utils/fsTalker');

router.get('/', async (_req, res) => {
    try {
      const result = await readTalkerData();
      console.log(result);
      if (result.length === 0) return res.status(200).json([]);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error.message); 
    }
  });

module.exports = router;
