import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type Props = { postId: string };

const LikeButton = ({ postId }: Props) => {
  const [session, setSession] =
    useState<
      Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]
    >(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const userId = session?.user?.id;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchCount = async () => {
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);
    setCount(count ?? 0);
  };

  const fetchLiked = async () => {
    if (!userId) return setLiked(false);
    const { data } = await supabase
      .from("likes")
      .select("post_id,user_id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();
    setLiked(!!data);
  };

  useEffect(() => {
    fetchCount();
  }, [postId]);

  useEffect(() => {
    fetchLiked();
  }, [userId, postId]);

  const toggle = async () => {
    if (!userId) {
      alert("Sign in to like");
      return;
    }
    if (liked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      if (!error) {
        setLiked(false);
        setCount((c) => (c ?? 0) - 1);
      }
    } else {
      const { error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: userId });
      if (!error) {
        setLiked(true);
        setCount((c) => (c ?? 0) + 1);
      }
    }
  };

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1.5 rounded-lg border transition ${
        liked
          ? "bg-pink-600 text-white border-pink-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
      title={liked ? "Unlike" : "Like"}
    >
      ❤️ {count ?? "—"}
    </button>
  );
};

export default LikeButton;
