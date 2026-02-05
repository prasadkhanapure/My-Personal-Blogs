import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, description, published_at")
        .order("published_at", { ascending: false });
      if (!error && data) setPosts(data);
    })();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      {posts.length === 0 && (
        <p className="text-sm text-gray-500">
          No posts yet.{" "}
          <Link to="/admin" className="underline">
            Create one
          </Link>
          .
        </p>
      )}
      <ul className="space-y-4">
        {posts.map((p) => (
          <li
            key={p.id}
            className="p-4 border rounded-xl border-gray-200 dark:border-gray-700 hover:shadow-sm"
          >
            <Link to={`/blogs/${p.slug}`} className="block">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">
                {p.published_at ? new Date(p.published_at).toDateString() : ""}
              </p>
              {p.description && (
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {p.description}
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
