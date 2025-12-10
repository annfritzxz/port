export interface Project {
  id: number;
  created_at?: string;
  title: string;
  tech: string;
  img: string;
}

export interface Certificate {
  id: number;
  created_at?: string;
  title: string;
  sub: string;
  date: string;
  details: string;
}

export interface Achievement {
  id: number;
  created_at?: string;
  title: string;
  year: string;
  desc: string;
}

export interface Message {
  id: number;
  created_at?: string;
  name: string;
  email: string;
  msg: string;
}
