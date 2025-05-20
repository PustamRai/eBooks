export interface Book {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  file: string;
  author: Author;
}

interface Author {
  name: string;
}
