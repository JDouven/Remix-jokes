import Breadcrumb from '~/components/breadcrumb';

export const handle = {
  breadcrumb: () => <Breadcrumb to="/">&gt; New</Breadcrumb>,
};

export default function NewJokeRoute() {
  return (
    <div>
      <h2 className="text-2xl font-bold pb-8">Add your own hilarious joke</h2>
      <form
        method="post"
        className="grid grid-cols-[auto,_auto] max-w-[40rem] gap-8"
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="border border-gray-400 focus:border-2 focus:border-teal-500 outline-none rounded px-1 min-w-[20rem]"
        />
        <label>Content: </label>
        <textarea
          name="content"
          className="border border-gray-400 focus:border-2 focus:border-teal-500 outline-none rounded px-1 min-w-[20rem]"
        />
        <button
          type="submit"
          className="col-start-2 px-4 py-2 min-h-[3rem] rounded-lg bg-violet-600 text-white text-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
}
