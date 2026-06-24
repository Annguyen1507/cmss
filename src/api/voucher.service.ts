import api from "./axios";

export function getVouchers() {
  return api.get("/admins/vouchers", {
    params: {
      page: 1,
      limit: 1000,
      offset: 0,
    },
  });
}
