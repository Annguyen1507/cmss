import { useEffect, useState } from "react";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getVouchers, deleteVouchers } from "../features/voucher/api/voucher.service";
import { getVoucherColumns } from "../features/voucher/voucherColumns";
import type { Voucher } from "../features/voucher/type";
import type { SortingState } from "@tanstack/react-table";
import usePageParam from "../hooks/usePageParam";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

export default function Voucher() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const {currentPage, handlePageChange} = usePageParam();
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedSearch(search);

  useEffect(() => {
    async function fetchVouchers() {
      try {
        const response = await getVouchers({
          page: currentPage,
          limit: pageSize,
          search: debouncedSearch,
          sorting,
        });

        setVouchers(response.data.data);
        setTotalRows(response.data.metadata.totalCount);
        console.log(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVouchers();
  }, [currentPage, pageSize, debouncedSearch, sorting]);

  async function handleDeleteVoucher(id: string) {
    try {
      await deleteVouchers(id);

      const response = await getVouchers({
        page: currentPage,
        limit: pageSize,
        search: debouncedSearch,
        sorting,
      });

      setVouchers(response.data.data);
      setTotalRows(response.data.metadata.totalCount);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    handlePageChange(1);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    handlePageChange(1);
  }

  function handleSortingChange(nextSorting: SortingState) {
    setSorting(nextSorting);
    handlePageChange(1);
  }

  const columns = getVoucherColumns(handleDeleteVoucher);

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title="Voucher"
          buttonText="Create Voucher"
          search={search}
          onSearchChange={handleSearchChange}
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
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSortingChange={handleSortingChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}