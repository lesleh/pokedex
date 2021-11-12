import Pokedex from "pokedex-promise-v2";
import Link from "next/link";
import Image from "next/image";

export default function Pikachu({ pokemon }) {
  return (
    <div className="container max-w-prose">
      <Link href="/">Back</Link>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        layout="responsive"
        width={475}
        height={475}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  var P = new Pokedex();
  const pokemon = await P.getPokemonByName(context.params.slug);
  return {
    props: {
      pokemon,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  var P = new Pokedex();
  const pokemon = await P.getPokemonsList({ limit: 151 });
  const paths = pokemon.results.map((p) => ({
    params: { slug: p.name },
  }));
  return {
    paths,
    fallback: false,
  };
}
