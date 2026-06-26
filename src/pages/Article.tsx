import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { getArticles, deleteArticles } from "../features/article/api/article.service";
import { getArticleColumns } from '../features/article/articleColumns';
import type { Article } from '../features/article/type';
import usePageParam from '../hooks/usePageParam';
import useDebouncedSearch from '../hooks/useDebouncedSearch';
import type { SortingState } from '@tanstack/react-table';
import DeleteModal from '../components/DeleteModal';

export default function Article() {
      const [articles, setArticles] = useState<Article[]>([]);
      const {currentPage, handlePageChange} = usePageParam();
      const [totalRows, setTotalRows] = useState(0);
      const [pageSize, setPageSize] = useState(25);
      const [sorting, setSorting] = useState<SortingState>([]);
      const [search, setSearch] = useState('');
      const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
      const debouncedSearch = useDebouncedSearch(search);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await getArticles({
                    page: currentPage,
                    limit: pageSize,
                    search: debouncedSearch,
                    sorting,
                });

                setArticles(response.data.data);
                setTotalRows(response.data.metadata.totalCount);
                console.log(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
    }, [currentPage, pageSize, debouncedSearch, sorting]);

    function handleOpenDeleteModal(id: string) {
        const selectedArticle = articles.find(
            (article) => article.id === id,
        );

        if (!selectedArticle) return;

        setArticleToDelete(selectedArticle);
    }

    async function handleDeleteArticle() {
        if (!articleToDelete) return;
        try {
          await deleteArticles([articleToDelete.id]);
    
          const response = await getArticles({
            page: currentPage,
            limit: pageSize,
            search: debouncedSearch,
            sorting,
          });
    
          setArticles(response.data.data);
          setTotalRows(response.data.metadata.totalCount);
          setArticleToDelete(null);
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

  const columns = getArticleColumns(handleOpenDeleteModal);
    return (
        <>
            <div className="flex h-full flex-col">
                <Header
                    title="Article"
                    buttonText="Create Article"
                    search={search}
                    onSearchChange={handleSearchChange}
                />
                <div className="flex-1 overflow-hidden p-6">
                    <div className="h-full overflow-y-auto rounded-sm bg-white">
                        <DataTable
                            columns={columns}
                            data={articles}
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
                {articleToDelete && (

                <DeleteModal
                    title={articleToDelete.title}
                    onCancel={() =>
                        setArticleToDelete(null)
                    }
                    onConfirm={handleDeleteArticle}
                />

            )}

            </div>
        </>
    );
}