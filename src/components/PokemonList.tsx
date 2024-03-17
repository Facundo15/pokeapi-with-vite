import PokemonData from "./PokemonData";

const PokemonList = ({ pokemonsData }: any) => {
    return (
        <div>
            <div className="container">
                {pokemonsData.length > 0 ? (
                    <div className="grid grid-cols-4 gap-5">
                        {pokemonsData.map((pokemon, idx) => (
                            <PokemonData key={`pokemon-data-${idx}`} {...pokemon} />
                        ))}
                    </div>
                ) : (
                    <p className="text-white">Search any Pokemon</p>
                )}
            </div>
        </div>
    )
};

export default PokemonList;