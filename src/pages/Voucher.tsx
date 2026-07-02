import { useEffect, useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getVouchers, createVouchers, getVoucherById, patchVouchers } from "../features/voucher/api/voucher.service";
import { getVoucherColumns } from "../features/voucher/voucherColumns";
import type { Voucher } from "../features/voucher/type";
import type { SortingState } from "@tanstack/react-table";
import usePageParam from "../hooks/usePageParam";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import VoucherForm from "../components/VoucherForm";
import type { VoucherFormValues } from "../components/VoucherForm";


export default function Voucher() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const { currentPage, currentSearch, handlePageChange, handleSearch } = usePageParam();
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState(currentSearch);
  const debouncedSearch = useDebouncedSearch(search);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchVouchers() {
    setLoading(true);
    try {
      const response = await getVouchers({
        page: currentPage,
        limit: pageSize,
        search: currentSearch,
        sorting,
      });

      setVouchers(response.data.data);
      setTotalRows(response.data.metadata.totalCount);
      console.log(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVouchers();
  }, [currentPage, pageSize, currentSearch, sorting]);

  useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch]);

  async function handleCreateVoucher(values: VoucherFormValues) {
    try {
      await createVouchers(values);

      await fetchVouchers();

      setShowCreateForm(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePatchVoucherStatus(voucherId: string) {
    try {
      const res = await getVoucherById(voucherId);
      const voucher = res.data.data;

      const newStatus = voucher.status === "active" ? "inactive" : "active";

      await patchVouchers(voucherId, {
        code: voucher.code,
        description: voucher.description,
        startDate: voucher.startDate,
        endDate: voucher.endDate,
        status: newStatus,
        type: voucher.type,
        amount: voucher.amount,
        quantityUse: voucher.quantityUse,
        minPayAmount: voucher.minPayAmount,
        maxDiscountAmount: voucher.maxDiscountAmount,
      });

      await fetchVouchers();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function test() {
      try {
        const response = await getVoucherById(
          "00b77b4a-244e-4cc8-9198-29a5d5db623a"
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    test();
  }, []);

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    handlePageChange(1);
  }

  function handleSortingChange(nextSorting: SortingState) {
    setSorting(nextSorting);
    handlePageChange(1);
  }

  const columns = getVoucherColumns(handlePatchVoucherStatus);

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title="Voucher"
          buttonText="Create Voucher"
          search={search}
          onSearchChange={handleSearchChange}
          onButtonClick={() => setShowCreateForm(true)}
        />
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full overflow-y-auto rounded-sm bg-white">
            <DataTable
              columns={columns}
              data={vouchers}
              page={currentPage}
              pageSize={pageSize}
              totalRows={totalRows}
              sorting={sorting}
              loading={loading}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSortingChange={handleSortingChange}
            />
          </div>
        </div>
        {showCreateForm && (
          <VoucherForm
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateVoucher}
          />
        )}
      </div>
    </>
  );
}