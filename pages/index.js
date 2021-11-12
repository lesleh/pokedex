import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Pokedex from "pokedex-promise-v2";

export default function Home({ pokemon }) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemon.map((p) => (
          <div
            className="dark:bg-purple-200 dark:text-gray-800 bg-purple-800 text-gray-200 rounded-md p-3 text-center"
            key={p.name}
          >
            <Link href={`/pokemon/${p.name}`}>{p.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  var P = new Pokedex();
  const pokemon = await P.getPokemonsList({ limit: 151 });
  return {
    props: {
      pokemon: pokemon.results,
    }, // will be passed to the page component as props
  };
}
