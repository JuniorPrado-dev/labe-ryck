import  axios  from 'axios';
import { CharacterOutputDTO } from '../model/characterDTO';
export async function getCharactersAPI() {
    try {
      //faz requisição
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      //pega dados
      const characters: any[] = response.data.results
      //remaeeia dados
      const charactersRemap = characters.map((c)=>{
        return {
          id: c.id,
          name:c.name,
          species: c.species,
          image: c.image}
      })
      //console.log(charactersRemap);
      //retorna dados no formato
      return charactersRemap;
    } catch (error) {
      console.error(error);
    }
  }