import type { Joke } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Breadcrumb from '~/components/breadcrumb';
import { db } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => <Breadcrumb to="/">&gt; Joke</Breadcrumb>,
};

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) throw new Error('Joke not found');
  const data: LoaderData = { joke };
  return json(data);
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p className="font-bold text-3xl">Here's your hilarious joke:</p>
      <p className="italic text-2xl">{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
