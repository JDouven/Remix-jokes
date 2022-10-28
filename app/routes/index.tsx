import { Link } from '@remix-run/react';
import Breadcrumb from '~/components/breadcrumb';

export const handle = {
  breadcrumb: () => <Breadcrumb to="/">&gt; Home</Breadcrumb>,
};

export default function IndexRoute() {
  return (
    <div className="py-12 flex flex-col justify-center items-center">
      <h1 className="text-4xl m-0 text-center leading-[0.5]">
        Remix{' '}
        <span className="block text-7xl leading-none uppercase lg:text-9xl">
          Jokes!
        </span>
      </h1>
      <nav>
        <ul className="flex list-none m-0 p-0 gap-4 text-lg leading-none">
          <li>
            <Link
              className="hover:decoration-wavy hover:decoration-1 text-teal-600 font-bold text-xl"
              to="jokes"
            >
              &gt; Read Jokes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
