import api from "./axios";

export function getArticles() {
  return api.get("/admins/articles", {
    params: {
      page: 1,
      limit: 1000,
      offset: 0,
    },
  });
}
