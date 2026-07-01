import type { SortingState } from "@tanstack/react-table";
import api from "../../../api/axios";
import type { SessionFormValues } from "../../../components/SessionForm";

type getSessionsParams = {
  page: number;
  limit: number;
  search?: string;
  sorting?: SortingState;
};

type createSessionsParams = {
  title: string,
  content: string,
  picture: string,
  status: "published" | "unpublished" | "draft",
  type: "pd";
  timeToRead: number,
  author: string,
  categoryId: string,
}

export function getSessions({
  page,
  limit,
  search = "",
  sorting = [],
}: getSessionsParams) {
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

export function deleteSessions(ids: string[]) {
  return api.delete(`/admins/articles`, {
    data: {
      ids,
    },
  });
}

export function createSessions({
 title,
 content,
 picture,
 status,
 type,
 timeToRead,
 author,
 categoryId,
}: createSessionsParams) {
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

export function updateSessions(
    id: string,
    data: SessionFormValues,
) {
    return api.put(
        `/admins/articles/${id}`,
        data,
    );
}

export function getSessionById(id: string) {
  return api.get(`/admins/articles/${id}`);
}