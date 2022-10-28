import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useMatches } from '@remix-run/react';
import Breadcrumb from '~/components/breadcrumb';
import { db } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => (
    <>
      <Breadcrumb to="/">&gt; Home</Breadcrumb>
      <Breadcrumb to="/jokes">&gt; Jokes</Breadcrumb>
    </>
  ),
};

type LoaderData = {
  jokeListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany({
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: 'desc' },
    }),
  };
  return json(data);
};

export default function JokesRoute() {
  const matches = useMatches();
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <header className="bg-slate-700 p-12">
        <h1 className="text-6xl text-teal-400 font-bold">J🤪KES</h1>
        <div className="py-2 text-gray-100 flex flex-row gap-2">
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match) => match.handle!.breadcrumb(match))}
        </div>
      </header>
      <main className="p-12 gap-8 flex flex-col">
        <div>
          <Link
            className="hover:decoration-wavy hover:decoration-1 text-teal-600 font-bold text-xl"
            to="."
          >
            Get a random joke
          </Link>
        </div>
        <ul className="flex list-none m-0 p-0 gap-4 text-lg leading-none">
          {data.jokeListItems.map((joke) => (
            <li key={joke.id}>
              <Link
                className="hover:decoration-wavy hover:decoration-1 text-teal-600 font-bold text-xl"
                to={joke.id}
              >
                &gt; {joke.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Link
            className="col-start-2 px-4 py-2 min-h-[3rem] rounded-lg bg-violet-600 text-white text-lg"
            to="new"
          >
            Add your own
          </Link>
        </div>
        <Outlet />
      </main>
    </>
  );
}
