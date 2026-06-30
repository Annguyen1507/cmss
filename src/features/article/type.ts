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

export type ArticleDetail = {
  id: string;
  title: string;
  content: string;
  picture: string;
  status: "draft" | "published" | "unpublished";
  type: "article" | "pd";
  timeToRead: number;
  author: string;
  categoryId: string;
};
