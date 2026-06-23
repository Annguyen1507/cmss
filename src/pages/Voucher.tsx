import { useEffect, useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getVouchers } from "../api/voucher.service";
import { voucherColumns } from "../features/voucher/voucherColumns";
import type { Voucher } from "../features/voucher/type";

export default function Voucher() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    async function fetchVouchers() {
      try {
        const response = await getVouchers();

        setVouchers(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVouchers();
  }, []);

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title="Voucher"
          buttonText="Create Voucher"
        />
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full overflow-y-auto rounded-sm bg-white">
            <DataTable
              columns={voucherColumns}
              data={vouchers}
            />
          </div>
        </div>
      </div>
    </>
  );
}