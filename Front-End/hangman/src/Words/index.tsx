import axios from "axios";
 
// Interface correta para a resposta da API
interface WordResponse {
  maskedWord: string;
  clue: string;
}
 
// Função que busca palavra e dica da API
export async function getWordAndClue(): Promise<{ word: string; clue: string }> {
  try {
    const response = await axios.get<WordResponse>('http://localhost:5155/api/hangman/NewGame', {
      headers: {
        'Accept': 'application/json',
      },
    });    
    // Renomeando os campos "text" para "word" e "tip" para "clue"
    console.log(response.data); 
    return { word: response.data.maskedWord, clue: response.data.clue };
  } catch (error) {
    console.error('Erro ao buscar a palavra:', error);
    throw new Error('Erro ao buscar a palavra e a dica.');
  }
}