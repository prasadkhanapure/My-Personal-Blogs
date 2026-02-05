import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

type Post = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  published_at: string | null;
};

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, description, published_at")
        .order("published_at", { ascending: false });
      if (!error && data) setPosts(data);
    })();
  }, []);

  const handleBlogCreation = () => {
    navigate("/new-blog");
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 pl-4">Blogs</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleBlogCreation}
        >
          Create Blog
        </button>
      </div>
      <ul className="space-y-4">
        {posts.map((blog) => (
          <li
            key={blog.id}
            className="p-4 border rounded-xl border-gray-200 dark:border-gray-700 hover:shadow-sm"
          >
            <Link to={`/blogs/${blog.slug}`} className="block">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500">
                {blog.published_at
                  ? new Date(blog.published_at).toDateString()
                  : ""}
              </p>
              {blog.description && (
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {blog.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
