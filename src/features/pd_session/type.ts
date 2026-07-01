export type Session = {
  id: string;
  title: string;
  author: string;
  category: {
    name: string;
  } | null;
  status: "draft" | "published" | "unpublished";
  createdAt: string;
};

export type SessionDetail = {
  id: string;
  title: string;
  content: string;
  picture: string;
  status: "draft" | "published" | "unpublished";
  type: "pd";
  timeToRead: number;
  author: string;
  categoryId: string;
};
