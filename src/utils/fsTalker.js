const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
}

const getAllTalkers = async () => {
  const data = await readTalkerData();
  return data;
};

const getTalkersById = async (id) => {
  const data = await readTalkerData();
  const talker = data.find((element) => element.id === Number(id));
  return talker;
};

module.exports = { getAllTalkers, getTalkersById };