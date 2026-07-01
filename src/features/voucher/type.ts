import type { SortingState } from "@tanstack/react-table";

export type Voucher = {
  id: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  type: string;
  amount: string;
  quantityUse: number;
  minPayAmount: string;
  maxDiscountAmount: string;
  stripeCouponId: string | null;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  numOfUsed: string;
};

export type VoucherStatus =  {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  type: string;
  amount: number;
  minPayAmount: number;
  maxDiscountAmount: number;
}

export type VoucherResponse = {
  message: string;
  data: Voucher[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
};

export type DoulaVoucher = {
  id: string;
  doulaId: string;
  voucherId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  doulaUser: {
    id: string;
    fullName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    picture: string | null;
  };
};

export type DoulaVoucherResponse = {
  message: string;
  data: DoulaVoucher[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
};

export type GetDoulaVouchersProps = {
  voucherId: string;
  page: number;
  limit: number;
  sorting?: SortingState;
};


