import api from "./axios";

export function getArticles() {
  return api.get("/admins/articles");
}
