import { Link, useSearchParams } from '@remix-run/react';

export default function Login() {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh_-_env(safe-area-inset-bottom))] bg-teal-800">
      <div className="flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow w-[400px] max-w-full sm:p-4 sm:rounded-md">
        <h1 className="mt-0 text-4xl">Login</h1>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <fieldset className="flex justify-center space-x-8">
            <legend className="sr-only">Login or Register?</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked
              />{' '}
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="register" /> Register
            </label>
          </fieldset>
          <div>
            <label htmlFor="username-input">Username</label>
            <input type="text" id="username-input" name="username" />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input id="password-input" name="password" type="password" />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
      <div>
        <ul className="mt-4 p-0 list-none flex gap-6 items-center">
          <li>
            <Link className="hover:decoration-wavy decoration-1" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:decoration-wavy decoration-1" to="/jokes">
              Jokes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
