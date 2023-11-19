export type NavMessages = {
  logo_text: string;
  create_prompt: string;
  login: string;
  signup: string;
  logout: string;
  profile_title: string;
};

export type UserProfile = {
  profile: {
    id: string;
    email: string;
    username: string;
    image: string;
  };
};

export type UserSession = {
  session: {
    id: string;
    email: string;
    username: string;
    image: string;
  };
};
