export type SiteConfig = {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  social: {
    linkedin: string;
    github?: string;
    email?: string;
  };
};

export const site: SiteConfig = {
  name: "Prasad Khanapure",
  title: "Blogger",
  tagline: "UI Developer",
  avatarUrl: "",
  social: {
    linkedin: "https://www.linkedin.com/in/prasad-khanapure/",
    github: "https://github.com/prasadkhanapure",
    email: "pnkhanapure@gmail.com"
  }
};
