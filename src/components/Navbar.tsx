import { Link, NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { site } from "../site.config";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const { email } = session?.user;
        dispatch(addUser(email));
        navigate("/blogs");
      } else {
        dispatch(removeUser());
        navigate("/signup");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = () => {
    supabase.auth.signOut();
    dispatch(removeUser());
    navigate("/signup");
  };

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gray-50/80 backdrop-blur dark:bg-gray-800/60 shadow-sm">
      <Link to="/" className="text-lg font-semibold">
        {site.name}
      </Link>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <NavLink to="/">About</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>

            <button
              onClick={handleSignOut}
              className="px-2 py-1 rounded border"
            >
              Sign out
            </button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
