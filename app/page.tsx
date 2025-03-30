import { db } from "@/utils/db";
import TodoComponent from "./components/TodoComponent";
import { CircleUserRound, CircleX } from "lucide-react";
import * as action from "@/utils/actions/index";
import Link from "next/link";

interface Data {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
}

export default async function Home() {
  const data = await db.todo.findMany({});
  console.log(data);

  return (
    <>
      <div className="flex flex-col max-w-[365px]:flex-col md:flex-row justify-center m-5">
        <TodoComponent />
        <div className="flex flex-col justify-evenly flex-1 mx-3 my-5 gap-2">
          {data.map((d: Data) => (
            <div className="shadow p-2  border rounded-md bg-red-50" key={d.id}>
              <div className="m-1 relative">
                <h1 className="text-lg">
                  <p>{d.title}</p>
                </h1>
                <div>
                  <h1 className="flex flex-row items-center">
                    <CircleUserRound className="size-4" />
                    <p className="ml-1">{d.author}</p>
                  </h1>
                  <p className="text-sm ml-2">{d.description}</p>
                </div>
                <form action={action.removeTodo}>
                  <input type="hidden" name="id" value={d.id} />
                  <button type="submit" className="cursor-pointer">
                    <CircleX className="absolute top-0 right-0 hover:text-red-500" />
                  </button>
                </form>
                <div
                  className={`badge ${
                    d.category === "Urgent"
                      ? "badge-error" // Change to Tailwind red
                      : d.category === "High"
                      ? "badge-info"
                      : d.category === "Medium"
                      ? "badge-warning"
                      : d.category === "Low"
                      ? "badge-neutral"
                      : "badge-primary"
                  } `}
                >
                  <span className="text-xs">{d.category}</span>
                </div>
                <Link
                  href={`/update-todo/${d.id}`}
                  className="btn btn-primary btn-xs btn-outline float-end mt-1"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
