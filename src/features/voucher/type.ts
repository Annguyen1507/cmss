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
