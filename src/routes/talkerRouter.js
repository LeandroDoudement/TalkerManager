const express = require('express');

const router = express.Router();

const { 
  getAllTalkers, 
  getTalkersById, 
  writeTalkerData, 
  editTalkerData,
  deleteTalkerData, 
  searchTalkers } = require('../utils/fsTalker');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateValue,
} = require('../middlewares/talkerValidation');

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  if (!q || q === '') {
    const currentData = await getAllTalkers();
    return res.status(200).json(currentData);
  }
  const searchedTalkers = await searchTalkers(q);
  return res.status(200).json(searchedTalkers);
});

router.get('/', async (_req, res) => {
  try {
    const result = await getAllTalkers();
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

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateValue,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    try {
      const existingData = await getAllTalkers();
      const newTalker = {
        name,
        age,
        id: existingData.length + 1,
        talk: {
          watchedAt,
          rate,
        },
      };
      await writeTalkerData(newTalker);
      return res.status(201).json(newTalker);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateValue,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    try {
      const newTalker = {
        name,
        age,
        id: Number(id),
        talk: {
          watchedAt,
          rate,
        },
      };
      editTalkerData(newTalker, id);
      return res.status(200).json(newTalker);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  try {
  const { id } = req.params;
  const currentData = await getAllTalkers();
  const doesIdExist = currentData.some((element) => element.id === Number(id));
  if (!doesIdExist) {
    return res.status(404).json({ message: 'ID não encontrado' });
  }
  await deleteTalkerData(id);
  return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
