import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { getArticles, deleteArticles, createArticles, getArticleById, updateArticle } from "../features/article/api/article.service";
import { getArticleColumns } from '../features/article/articleColumns';
import type { Article } from '../features/article/type';
import usePageParam from '../hooks/usePageParam';
import useDebouncedSearch from '../hooks/useDebouncedSearch';
import type { SortingState } from '@tanstack/react-table';
import DeleteModal from '../components/DeleteModal';
import ArticleForm from '../components/ArticleForm';
import type { ArticleFormValues } from '../components/ArticleForm';

export default function Article() {
    const [articles, setArticles] = useState<Article[]>([]);
    const { currentPage, currentSearch, handlePageChange, handleSearch } = usePageParam();
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState(currentSearch);
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
    const debouncedSearch = useDebouncedSearch(search);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchArticles() {
        setLoading(true);
        try {
            const response = await getArticles({
                page: currentPage,
                limit: pageSize,
                search: currentSearch,
                sorting,
            });

            setArticles(response.data.data);
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
        fetchArticles();
    }, [currentPage, pageSize, currentSearch, sorting]);

    useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch]);

    async function handleCreateArticle(values: ArticleFormValues) {
        try {
            await createArticles(values);

            await fetchArticles();

            setShowCreateForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpdateArticle(
        values: ArticleFormValues,
    ) {
        if (!editingArticleId) return;

        try {
            await updateArticle(editingArticleId, values);

            await fetchArticles();

            setShowEditForm(false);

            setEditingArticleId(null);
        } catch (error) {
            console.error(error);
        }
    }

    function handleOpenDeleteModal(id: string) {
        const selectedArticle = articles.find(
            (article) => article.id === id,
        );

        if (!selectedArticle) return;

        setArticleToDelete(selectedArticle);
    }

    function handleOpenEditModal(id: string) {
    setEditingArticleId(id);
    setShowEditForm(true);
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
    }

    function handlePageSizeChange(size: number) {
        setPageSize(size);
        handlePageChange(1);
    }

    function handleSortingChange(nextSorting: SortingState) {
        setSorting(nextSorting);
        handlePageChange(1);

    }

    const columns = getArticleColumns(handleOpenDeleteModal, handleOpenEditModal);
    return (
        <>
            <div className="flex h-full flex-col">
                <Header
                    title="Article"
                    buttonText="Create Article"
                    search={search}
                    onSearchChange={handleSearchChange}
                    onButtonClick={() => setShowCreateForm(true)}
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
                            loading={loading}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                            onSortingChange={handleSortingChange}
                        />
                    </div>
                </div>
                {articleToDelete && (

                    <DeleteModal
                        title={"Delete Article?"}
                        onCancel={() =>
                            setArticleToDelete(null)
                        }
                        onConfirm={handleDeleteArticle}
                    />

                )}

                {showCreateForm && (
                    <ArticleForm
                        onClose={() => setShowCreateForm(false)}
                        onSubmit={handleCreateArticle}
                    />
                )}

                {showEditForm && (
                    <ArticleForm
                        articleId={editingArticleId ?? undefined}
                        onClose={() => {
                            setEditingArticleId(null);
                            setShowEditForm(false);
                        }}
                        onSubmit={handleUpdateArticle}
                    />
                )}

            </div>
        </>
    );
}