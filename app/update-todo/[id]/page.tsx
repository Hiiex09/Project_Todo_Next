import { db } from "@/utils/db";
import * as action from "@/utils/actions/index";

interface Todo {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const data: Todo | null = await db.todo.findUnique({
    where: { id },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Todo
        </h1>

        <form action={action.updateTodo} className="space-y-4">
          <input type="hidden" name="updateid" value={data?.id} />

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data?.title}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data?.description}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              className="input input-bordered w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={data?.author}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              defaultValue={data?.category}
              className="select select-bordered w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled>Pick a category</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-outline btn-sm"
            >
              Save
            </button>
            <button type="submit" className="btn btn-error btn-outline btn-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
