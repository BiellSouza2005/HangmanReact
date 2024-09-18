export async function getWordAndClue() {
    try {
      let wordData;
      let word = '';

      do {
        const randomWordResponse = await fetch('https://api.dicionario-aberto.net/random');
        if (!randomWordResponse.ok) {
          throw new Error('Erro ao buscar a palavra aleatória.');
        }
        
        wordData = await randomWordResponse.json();
        word = wordData.word.toUpperCase();
      } while (word.includes('-')); 
  
      const wordForPrefix = word.slice(0, -1).toLowerCase(); 
  
  
      const prefixResponse = await fetch(`https://api.dicionario-aberto.net/prefix/${wordForPrefix}`);
      if (!prefixResponse.ok) {
        throw new Error('Erro ao buscar a dica da palavra.');
      }
      
      const prefixData = await prefixResponse.json();
  
    
      let clue = 'Dica não encontrada';
      if (prefixData.length > 0 && prefixData[0].preview) {
        clue = prefixData[0].preview
          .replace(/<\/?span.*?>/g, '') 
          .replace(/<\/?i.*?>/g, '')   
          .replace(/<\/?sup.*?>/g, '')   
          .split(';')[1]                // Divide a string pelo ";" e pega a terceira parte (entre o primeiro e o segundo ";")
          .trim();                      // Remove espaços em branco extras
      }
  
      return { word, clue };
    } catch (error) {
      console.error('Erro ao obter palavra e dica:', error);
      return { word: 'ERRO', clue: 'Erro ao buscar a palavra e a dica.' }; // Valor de fallback
    }
  }
  