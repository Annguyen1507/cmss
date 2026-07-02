import { useSearchParams } from "react-router-dom";

export default function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const currentSearch = searchParams.get("search") ?? "";

  function handlePageChange(page: number) {
    setSearchParams({ page: String(page), search: currentSearch });
  }

  function handleSearch(search: string) {
    setSearchParams({ page: String(1), search });
  }

  return { currentPage, currentSearch, handlePageChange, handleSearch };
}
