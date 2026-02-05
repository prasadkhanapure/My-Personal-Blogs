import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function Comments({ postId }: { postId: string }) {
  const [session, setSession] =
    useState<
      Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]
    >(null);
  const [items, setItems] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, post_id, user_id, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (!error && data) setItems(data);
  };

  useEffect(() => {
    load();
  }, [postId]);

  const submit = async () => {
    const userId = session?.user?.id;
    if (!userId) return alert("Sign in to comment");
    if (content.trim().length === 0) return;

    const { error } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: userId, content: content.trim() });
    if (!error) {
      setContent("");
      load();
    } else {
      alert(error.message);
    }
  };

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 mb-3">Be the first to comment.</p>
      )}

      <ul className="space-y-3 mb-4">
        {items.map((c) => (
          <li
            key={c.id}
            className="border rounded-lg p-3 border-gray-200 dark:border-gray-700"
          >
            <div className="text-sm text-gray-500">
              {new Date(c.created_at).toLocaleString()}
            </div>
            <div className="mt-1 whitespace-pre-wrap">{c.content}</div>
          </li>
        ))}
      </ul>

      <div className="grid gap-2">
        <textarea
          className="border rounded p-2 min-h-[100px] bg-transparent"
          placeholder="Write a comment…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={submit}
            className="px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Post comment
          </button>
        </div>
      </div>
    </section>
  );
}
