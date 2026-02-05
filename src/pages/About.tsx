import { site } from "../site.config";
import { Mail, Linkedin, Github, Twitter, FileText } from "lucide-react";

const About = () => {
  const avatarSrc =
    site.avatarUrl && site.avatarUrl.length > 0
      ? site.avatarUrl
      : "/profile-picture.jpeg";

  return (
    <section className="mx-auto">
      {/* Avatar + Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatarSrc}
          alt={`${site.name} avatar`}
          className="w-20 h-20 rounded-2xl border border-gray-200 dark:border-gray-700 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{site.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{site.tagline}</p>

          {/* Social Buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/prasad-khanapure"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition"
            >
              <Linkedin size={16} /> LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/prasadkhanapure"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-white hover:bg-black shadow-sm transition"
            >
              <Github size={16} /> GitHub
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/its_pksoul"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-900 shadow-sm transition"
            >
              <Twitter size={16} /> Twitter
            </a>

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <article className="prose dark:prose-invert">
        <h2>About Me</h2>
        <p>
          Hi, I’m <strong>{site.name}</strong> — a Front End React Developer and
          blogger. I share my thoughts, projects, and personal journey here.
        </p>
      </article>
    </section>
  );
};

export default About;
