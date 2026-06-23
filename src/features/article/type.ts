export type Article = {
  id: string;
  title: string;
  author: string;
  category: {
    name: string;
  } | null;
  status: "draft" | "published" | "unpublished";
  createdAt: string;
};
