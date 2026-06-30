import type { SortingState } from "@tanstack/react-table";
import api from "../../../api/axios";

type getVouchersParams = {
  page: number;
  limit: number;
  search?: string;
  sorting?: SortingState;
};

type createVouchersParams = {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  type: "fixed" | "percentage";
  amount: number;
  quantityUse: number;
  minPayAmount: number;
  maxDiscountAmount: number;
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

export function getVoucherById(id: string) {
  return api.get(`/admins/vouchers/${id}`);
}

export function createVouchers({
  code,
  description,
  startDate,
  endDate,
  status,
  type,
  amount,
  quantityUse,
  minPayAmount,
  maxDiscountAmount,
}: createVouchersParams) {
  return api.post("/admins/vouchers", {
    code,
    description,
    startDate,
    endDate,
    status,
    type,
    amount,
    quantityUse,
    minPayAmount,
    maxDiscountAmount,
  });
}

type getDoulaVouchersprops = {
  voucherId: string;
  page: number;
  limit: number;
  sorting?: SortingState;
};

export function getDoulaVouchers({
  voucherId,
  page,
  limit,
  sorting = [],
}: getDoulaVouchersprops) {
  const sort = sorting?.[0];
  return api.get("/admins/doula-vouchers", {
    params: {
      f_voucherId: voucherId,
      page,
      limit,
      ...(sort && {
        sort: sort.id,
      }),
    },
  });
}
