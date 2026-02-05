import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BlogList from "../pages/BlogList";
import BlogPost from "../pages/BlogPost";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Footer from "./Footer";

const AppRouter = () => {
  
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
