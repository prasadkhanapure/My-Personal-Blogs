import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "../utils/supabaseClient";
import fallback from "../posts/first-blog.md?raw";
import LikeButton from "../components/LikeButton";
import Comments from "../components/Comments";

type Post = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  published_at: string | null;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("posts")
        .select("id, slug, title, content, published_at")
        .eq("slug", slug)
        .single();
      if (data) setPost(data);
    })();
  }, [slug]);

  if (!post) {
    return (
      <article className="prose dark:prose-invert">
        <Link to="/blogs" className="no-underline text-sm">
          ← Back to Blog
        </Link>
        <h1>My First Blog (Local)</h1>
        <ReactMarkdown>{fallback}</ReactMarkdown>
        {post && (
          <div className="mt-6 flex items-center gap-3">
            <LikeButton postId={post.id} />
          </div>
        )}

        {/* Comments */}
        <Comments postId={post ? post.id : ""} />
      </article>
    );
  }

  return (
    <article className="prose dark:prose-invert">
      <Link to="/blogs" className="no-underline text-sm">
        ← Back to Blog
      </Link>
      <h1>{post.title}</h1>
      {post.published_at && (
        <p>
          <em>{new Date(post.published_at).toDateString()}</em>
        </p>
      )}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default BlogPost;
