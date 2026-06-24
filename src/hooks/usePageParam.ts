import { useSearchParams } from "react-router-dom";

export default function usePageParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    function handlePageChange(page: number) {
        setSearchParams({ page: String(page )});
    }
    return { currentPage, handlePageChange };
}