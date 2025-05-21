import { IUser } from "./user.types";

export interface IBook {
  _id: string;
  title: string;
  description: string;
  author: IUser;
  genre: string;
  coverImage: string;
  file: string;
  slug: string;
}
