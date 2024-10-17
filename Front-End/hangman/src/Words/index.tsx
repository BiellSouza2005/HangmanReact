import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASIC_URL;
 
// Interface correta para a resposta da API
interface WordResponse {
  maskedWord: string;
  clue: string;
  token: string;
}
 
// Função que busca palavra e dica da API
export async function getWordAndClue(): Promise<{ word: string; clue: string; token: string }> {
  try {
    const response = await axios.get<WordResponse>(`${apiUrl}hangman/NewGame`, {
      headers: {
        'Accept': 'application/json',
      },
    });    
    // Renomeando os campos "text" para "word" e "tip" para "clue"
    //console.log(response.data); 
    return { word: response.data.maskedWord, clue: response.data.clue , token: response.data.token};
  } catch (error) {
    console.error('Erro ao buscar a palavra:', error);
    throw new Error('Erro ao buscar a palavra e a dica.');
  }
}