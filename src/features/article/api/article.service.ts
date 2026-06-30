import type { SortingState } from "@tanstack/react-table";
import api from "../../../api/axios";
import type { ArticleFormValues } from "../../../components/ArticleForm";

type getArticlesParams = {
  page: number;
  limit: number;
  search?: string;
  sorting?: SortingState;
};

type createArticlesParams = {
  title: string,
  content: string,
  picture: string,
  status: "published" | "unpublished" | "draft",
  type: "article" | "pd";
  timeToRead: number,
  author: string,
  categoryId: string,
}

export function getArticles({
  page,
  limit,
  search = "",
  sorting = [],
}: getArticlesParams) {
  const sort = sorting[0];
  return api.get("/admins/articles", {
    params: {
      page,
      limit,
      offset: (page - 1) * limit,
      search,

      ...(sort && {
        sort: sort.id,
      }),
    },
  });
}

export function deleteArticles(ids: string[]) {
  return api.delete(`/admins/articles`, {
    data: {
      ids,
    },
  });
}

export function createArticles({
 title,
 content,
 picture,
 status,
 type,
 timeToRead,
 author,
 categoryId,
}: createArticlesParams) {
  return api.post("/admins/articles", {
    title,
    content,
    picture,
    status,
    type,
    timeToRead,
    author,
    categoryId,
  });
}

export function updateArticle(
    id: string,
    data: ArticleFormValues,
) {
    return api.put(
        `/admins/articles/${id}`,
        data,
    );
}

export function getArticleById(id: string) {
  return api.get(`/admins/articles/${id}`);
}