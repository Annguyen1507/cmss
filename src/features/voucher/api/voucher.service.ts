import type { SortingState } from "@tanstack/react-table";
import api from "../../../api/axios";

type getVouchersParams = {
  page: number;
  limit: number;
  search?: string;
  sorting?: SortingState;
};

export function getVouchers({
  page,
  limit,
  search = "",
  sorting = [],
}: getVouchersParams) {
  const sort = sorting[0];
  return api.get("/admins/vouchers", {
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

export function deleteVouchers(id: string) {
  return api.delete(`/admins/vouchers/${id}`);
}
