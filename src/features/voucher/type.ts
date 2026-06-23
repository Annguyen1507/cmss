export type Voucher = {
  id: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive";
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
