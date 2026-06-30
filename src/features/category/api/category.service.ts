import api from "../../../api/axios";

export function getCategories() {
  return api.get("/admins/categories");
}