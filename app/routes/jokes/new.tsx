import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import Breadcrumb from '~/components/breadcrumb';
import { db } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => <Breadcrumb to="/">&gt; New</Breadcrumb>,
};

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `That joke is too short`;
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return `That joke's name is too short`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    content: string | undefined;
  };
  fields?: {
    name: string;
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');

  if (typeof name !== 'string' || typeof content !== 'string') {
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  const fields = { name, content };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();
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
          defaultValue={actionData?.fields?.name}
          className="border border-gray-400 focus:border-2 focus:border-teal-500 outline-none rounded px-1 min-w-[20rem]"
          aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
          aria-errormessage={
            actionData?.fieldErrors?.name ? 'name-error' : undefined
          }
        />
        {actionData?.fieldErrors?.name ? (
          <p role="alert" id="name-error" className="text-red-500">
            {actionData.fieldErrors.name}
          </p>
        ) : null}
        <label>Content: </label>
        <textarea
          name="content"
          defaultValue={actionData?.fields?.content}
          className="border border-gray-400 focus:border-2 focus:border-teal-500 outline-none rounded px-1 min-w-[20rem]"
          aria-invalid={Boolean(actionData?.fieldErrors?.content) || undefined}
          aria-errormessage={
            actionData?.fieldErrors?.content ? 'content-error' : undefined
          }
        />
        {actionData?.fieldErrors?.content ? (
          <p role="alert" id="content-error" className="text-red-500">
            {actionData.fieldErrors.content}
          </p>
        ) : null}
        {actionData?.formError ? (
          <p role="alert" className="text-red-500">
            {actionData.formError}
          </p>
        ) : null}
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
