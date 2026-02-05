import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        navigate("/blogs");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        navigate("/blogs");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center text-white m-4 p-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 p-6 m-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        {!isLogin && (
          <input
            type="string"
            placeholder="Name"
            className="w-full p-4 mb-4 bg-zinc-800 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 bg-zinc-800 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-4 bg-zinc-800 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 p-4 my-4 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? <Spinner /> : isLogin ? "Sign In" : "Create Account"}
        </button>

        <p
          className="my-4 text-sm text-center cursor-pointer text-gray-400"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
