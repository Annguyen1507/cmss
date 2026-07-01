import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { SortingState } from "@tanstack/react-table";
import { getVoucherById, getDoulaVouchers } from "./api/voucher.service";
import { doulaVoucherColumns } from "../doulaVoucherColumns";
import DetailDataTable from "../../components/DetailDataTable";
import type { Voucher, DoulaVoucher } from "./type";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [doulaVouchers, setDoulaVouchers] = useState<DoulaVoucher[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchVoucher() {
      try {
        const res = await getVoucherById(id!);
        setVoucher(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVoucher();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    async function fetchDoulaVouchers() {
      try {
        const res = await getDoulaVouchers({
          voucherId: id!,
          page,
          limit: pageSize,
          sorting,
        });

        setDoulaVouchers(res.data.data);
        setTotalRows(res.data.metadata.totalCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDoulaVouchers();
  }, [id, page, pageSize, sorting]);

  if (!voucher) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex h-full overflow-y-auto flex-col p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-[#2F2F2F]"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="rounded-sm border border-[#D8D8D8] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Voucher Information</h2>

        <div className="flex flex-wrap gap-x-10 gap-y-6 text-[15px]">
          <Field label="Code" value={voucher.code} />
          <Field label="Start Date" value={formatDate(voucher.startDate)} />
          <Field label="End Date" value={formatDate(voucher.endDate)} />
          <Field
            label="Number Of Use"
            value={`${voucher.numOfUsed}/${voucher.quantityUse}`}
          />
          <Field label="Type of coupon" value={voucher.type} />
          <Field
            label="Amount"
            value={
              voucher.type === "percentage"
                ? `%${voucher.amount}`
                : `$${voucher.amount}`
            }
          />
          <Field label="Condition" value={`$${voucher.minPayAmount}`} />
          <Field
            label="Max Discount Amount"
            value={`$${voucher.maxDiscountAmount}`}
          />
          <Field label="Description" value={voucher.description || "-"} />
        </div>
      </div>

      <div className="mt-6">
        <DetailDataTable
          columns={doulaVoucherColumns}
          data={doulaVouchers}
          page={page}
          pageSize={pageSize}
          totalRows={totalRows}
          sorting={sorting}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortingChange={setSorting}
        />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="whitespace-nowrap">
      <div className="text-[#666]">{label}</div>
      <div className="font-bold text-black">{value}</div>
    </div>
  );
}