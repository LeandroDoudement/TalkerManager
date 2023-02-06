const express = require('express');

const router = express.Router();

const { getAllTalkers, getTalkersById } = require('../utils/fsTalker');

router.get('/', async (_req, res) => {
  try {
    const result = await getAllTalkers();
    console.log(result);
    if (result.length === 0) return res.status(200).json([]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getTalkersById(id);
    if (talker) {
      return res.status(200).json(talker);
    }
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
