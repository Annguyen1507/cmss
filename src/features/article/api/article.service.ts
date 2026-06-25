import type { SortingState } from "@tanstack/react-table";
import api from "../../../api/axios";

type getArticlesParams = {
  page: number;
  limit: number;
  search?: string;
  sorting?: SortingState;
};

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

export function deleteArticles(id: string) {
  return api.delete(`/admins/articles/${id}`);
}
