import PokemonList from "./components/PokemonList";
import { useState } from "react";
import api from './api/axios';
import IPokemon from "./classes/IPokemon";

function App() {
  const [name, setName] = useState<string>('');
  const [ability, setAbility] = useState<string>('');
  const [weight, setWeight] = useState<number>(-1);
  const [height, setHeight] = useState<number>(-1);
  const [searchBy, setSearchBy] = useState<string>('name');

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const handleChange = (e: any) => {
    const { target } = e;

    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'ability') {
      setAbility(target.value);
    } else if (target.name === 'weight') {
      setWeight(parseInt(target.value));
    } else if (target.name === 'height') {
      setHeight(parseInt(target.value));
    } else if (target.name === 'searchBy') {
      console.log(target.value)
      setSearchBy(target.value);
    }
  };

  const callApi = async () => {

    let apiUrl: string = '/pokemon';

    if (searchBy === 'name') {
      apiUrl += '/' + name + '/';
    } else {
      apiUrl += '?limit=100000&offset=0';
    }

    try {
      const response = await api.get(apiUrl);
      let data = response.data;

      if (data.results) {
        if (data.results.some((e: any) => e.url !== undefined)) {
          data = (await Promise.all(data.results.map(e => {
            return api.get(e.url);
          }))).map(e => e.data);

          console.log(searchBy)

          switch (searchBy) {
            case 'weight':
              data = data.filter(e => e.weight === weight)
              break;
            case 'height':
              data = data.filter(e => e.height === height)
              break;
            case 'ability':
              data = data.filter(e => {
                return e.abilities.some(j => j.ability.name === ability)
              });
              break;
          }
        } else {
          data = data.results;
        }
      } else {
        data = [data];
      }

      console.log(data)

      setPokemons(data.map(e => {
        const pokemon: IPokemon = {
          name: e.name,
          baseExperience: e.base_experience,
          weight: e.weight,
          height: e.height,
          id: e.id,
          imageUrl: e.sprites?.front_default,
          abilities: e.abilities.map(e => e.ability.name)
        };

        return pokemon;
      }));
    } catch (error) {
      console.error(error);
    } finally {
      console.log('finished reqquest');
    }
  }

  const searchSubmit = () => {
    callApi();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchSubmit();
    }
  }

  return (
    <div className="container flex justify-center align-middle">

      <div className="w-max">
        <div className="w-full flex justify-center align-middle">
          <img src={"https://assets.website-files.com/62c1627eee0defc3a1256898/62cf234679dbabe18fa50a1e_pokeapi_256%201.svg"} />
        </div>
        <div>
          <div className="container pt-3 pb-3">
            <select
              name="searchBy"
              value={searchBy}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="name">Name or ID</option>
              <option value="ability">Ability</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
            </select>

            {searchBy === 'name' ? (
              <input
                placeholder="Search by Name or ID"
                type="text"
                name="name"
                className="border w-80 border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            ) : (
              <></>
            )}

            {searchBy === 'ability' ? (
              <input
                placeholder="Search by Ability"
                type="text"
                name="ability"
                className="border w-80 border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            ) : (
              <></>
            )}


            {searchBy === 'weight' ? (
              <input
                type="number"
                min={0}
                name="weight"
                placeholder="Weight"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300"
                onKeyDown={handleKeyPress}
              />
            ) : (
              <></>
            )}

            {searchBy === 'height' ? (
              <input
                type="number"
                name="height"
                min={0}
                placeholder="Height"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300"
                onKeyDown={handleKeyPress}
              />
            ) : (
              <></>
            )}

            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={searchSubmit}>Search</button>
          </div>
        </div>
        <div className="pt-5">
          <hr className="p-5" />
          <PokemonList pokemonsData={pokemons} />
        </div>
      </div>
    </div>
  )
}

export default App
