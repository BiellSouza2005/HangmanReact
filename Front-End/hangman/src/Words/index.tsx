import axios from 'axios';

export async function getWordAndClue() {
  try {
    let wordData;
    let word = '';

    // Do enquanto para evitar palavras com "-"
    do {
      const randomWordResponse = await axios.get('https://api.dicionario-aberto.net/random');
      
      if (randomWordResponse.status !== 200) {
        throw new Error('Erro ao buscar a palavra aleatória.');
      }
      
      wordData = randomWordResponse.data;
      word = wordData.word.toUpperCase();
    } while (word.includes('-'));

    const wordForPrefix = word.slice(0, -1).toLowerCase();

    const prefixResponse = await axios.get(`https://api.dicionario-aberto.net/prefix/${wordForPrefix}`);
    
    if (prefixResponse.status !== 200) {
      throw new Error('Erro ao buscar a dica da palavra.');
    }

    const prefixData = prefixResponse.data;

    let clue = 'Dica não encontrada';
    if (prefixData.length > 0 && prefixData[0].preview) {
      clue = prefixData[0].preview
        .replace(/<\/?span.*?>/g, '')  // Remove tags span
        .replace(/<\/?i.*?>/g, '')     // Remove tags itálico
        .replace(/<\/?sup.*?>/g, '')   // Remove tags superscript
        .split(';')[1]                 // Pega a dica após o primeiro ";"
        .trim();                       // Remove espaços extras
    }

    return { word, clue };
  } catch (error) {
    console.error('Erro ao obter palavra e dica:', error);
    return { word: 'ERRO', clue: 'Erro ao buscar a palavra e a dica.' };
  }
}
