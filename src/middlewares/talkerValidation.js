const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16 || typeof authorization !== 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    if (!Number.isInteger(age)) {
      return res.status(400)
      .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  
    next();
  };

  const validateWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  
    if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    if (!dateRegex.test(watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  };

  const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate === undefined || rate === '') {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    } 
    next();
  };

  const validateRateValue = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next(); 
  };

module.exports = { 
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    validateRateValue };
