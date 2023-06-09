const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try {
    const data = await fs.readFile(
      path.resolve(__dirname, '..', 'talker.json'),
      'utf-8',
    );
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
    const existingData = await fs.readFile(
      path.resolve(__dirname, '..', 'talker.json'),
      'utf-8',
    );
    const parsedData = JSON.parse(existingData);
    parsedData.push(newTalker);
    const updatedData = JSON.stringify(parsedData);
    await fs.writeFile(
      path.resolve(__dirname, '..', 'talker.json'),
      updatedData,
      'utf-8',
    );
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
};

const editTalkerData = async (newTalker, id) => {
  try {
    const existingData = await getAllTalkers();
    const index = existingData.findIndex(
      (element) => element.id === Number(id),
    );
    existingData[index] = newTalker;
    await writeTalkerData(newTalker);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

const deleteTalkerData = async (id) => {
  try {
    const existingData = await getAllTalkers();
    const newData = existingData.filter((element) => element.id !== Number(id));
    await fs.writeFile(
      path.resolve(__dirname, '..', 'talker.json'),
      JSON.stringify(newData),
      'utf-8',
    );
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

const searchTalkers = async (searchTerm) => {
  const existingData = await getAllTalkers();
  const searchedTalkers = existingData.filter((element) => element.name.includes(searchTerm));
  return searchedTalkers;
};

module.exports = {
  getAllTalkers,
  getTalkersById,
  writeTalkerData,
  editTalkerData,
  deleteTalkerData,
  searchTalkers,
};
