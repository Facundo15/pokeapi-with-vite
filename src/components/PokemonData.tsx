import IPokemon from "../classes/IPokemon";

const PokemonData = (pokemon: IPokemon) => {
    return (
        <div className="max-w-sm max-w-64 rounded p-5 container bg-slate-100">
            <p className="text-xl capitalize ">{pokemon.name}</p>
            <div>
                <p className="text-lg">Abilities:</p>
                <ul>
                    {pokemon.abilities.map(e => (
                        <li><small className="text-sm">{e}</small></li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between">
                <small>ID: <span>{pokemon.id}</span></small>
                <small>XP: <span>{pokemon.baseExperience}</span></small>
            </div>
            <div>
                <img className="object-cover h-40 w-60 aspect-auto" src={pokemon.imageUrl} loading="lazy" />
            </div>
        </div>
    );
};


export default PokemonData;