"use client"; // Ensure this runs on the client

import { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast
import { Captions, Goal, Menu, NotepadText, SquareUser } from "lucide-react";
import { Outfit, Roboto } from "next/font/google";
import * as action from "@/utils/actions/index";
import { useRouter } from "next/navigation";
const outfit = Outfit({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const TodoComponent = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await action.createTodo(formData); // Call server action
      toast.success("New Todo added!");
      route.push("/");
    } catch (error) {
      toast.error("Failed to add Todo!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-full base-300 shadow p-2 flex-1 bg-blue-100">
      <div>
        <h1 className={`text-2xl ${outfit.className}`}>Todo Project</h1>
      </div>

      <div className="mt-10 p-2">
        <div className="flex flex-row items-center">
          <div className="m-2">
            <NotepadText />
          </div>
          <div className="m-2">
            <h1 className={`text-2xl ${roboto.className}`}>Create New Todo</h1>
          </div>
        </div>

        <div>
          <form
            action={handleSubmit} // Call client-side function
            className="m-5 max-w-2xl"
          >
            <div className="flex flex-col justify-center mt-2">
              <label
                className={`${roboto.className} text-lg flex flex-row items-center gap-2`}
              >
                <Goal /> Title
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input mt-2 w-full"
                name="title"
              />
            </div>
            <div className="flex flex-col justify-center mt-2">
              <label
                className={`${roboto.className} text-lg flex flex-row items-center gap-2`}
              >
                <Captions className="size-6" /> Description
              </label>
              <textarea
                className="textarea mt-2 w-full"
                placeholder="Description"
                name="description"
              ></textarea>
            </div>
            <div className="flex flex-col justify-center mt-2">
              <label
                className={`${roboto.className} text-lg flex flex-row items-center gap-2`}
              >
                <SquareUser className="size-6" /> Author
              </label>
              <input
                type="text"
                placeholder="Author"
                className="input mt-2 w-full"
                name="author"
              />
            </div>
            <div className="flex flex-col justify-center mt-2">
              <label
                className={`${roboto.className} text-lg flex flex-row items-center gap-2`}
              >
                <Menu className="size-6" /> Category
              </label>
              <select
                defaultValue="Pick a category"
                className="select mt-2 w-full"
                name="category"
              >
                <option>Urgent</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-md bg-blue-700 w-full mt-2 text-base-200"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Todo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
