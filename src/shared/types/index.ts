export interface User {
  username: string;
  avatar: string;
  color: string;
  email: string;
}

export interface MessagePayload {
  author: string;
  text: string;
  timestamp: number;
  file?: File | null;
}

export interface Message {
  author: string;
  text: string;
  timestamp: number;
  file?: FileData | null;
}

export interface FileData {
  route: string;
  type: string;
}
