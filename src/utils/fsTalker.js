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

const writeTalkerData = async (newTalker) => {
  try {
    const existingData = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
    const parsedData = JSON.parse(existingData);
    parsedData.push(newTalker);
    const updatedData = JSON.stringify(parsedData);
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), updatedData, 'utf-8');
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
};

module.exports = { getAllTalkers, getTalkersById, writeTalkerData };