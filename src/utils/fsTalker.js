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

module.exports = { readTalkerData };