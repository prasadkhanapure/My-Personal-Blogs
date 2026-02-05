import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { generateSlug } from "../utils/common";

const CreateNewBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((store: any) => store.user);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    const slug = generateSlug(title);

    const { error: insertError } = await supabase.from("posts").insert({
      title,
      description,
      content,
      slug,
      published: true,
      published_at: new Date(),
      author_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    navigate("/blogs");
  };

  const onCancelBlogCreation = () => {
    navigate("/blogs");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 mb-4 rounded-lg
          bg-white dark:bg-slate-800
          border border-gray-300 dark:border-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        className="w-full p-3 mb-4 rounded-lg
          bg-white dark:bg-slate-800
          border border-gray-300 dark:border-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <textarea
        placeholder="Write your blog here…"
        className="w-full p-3 mb-4 min-h-[400px] rounded-lg
          bg-white dark:bg-slate-800
          border border-gray-300 dark:border-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 rounded-lg
            bg-indigo-600 text-white
            hover:bg-indigo-700
            disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? <Spinner /> : "Publish"}
        </button>

        <button
          onClick={onCancelBlogCreation}
          className="px-6 py-2 rounded-lg
            border border-gray-300 dark:border-slate-700
            hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateNewBlog;
