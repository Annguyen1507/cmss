import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { getArticles, deleteArticles, createArticles, getArticleById, updateArticle } from "../features/article/api/article.service";
import { getArticleColumns } from '../features/article/articleColumns';
import type { Article, ArticleDetail } from '../features/article/type';
import usePageParam from '../hooks/usePageParam';
import useDebouncedSearch from '../hooks/useDebouncedSearch';
import type { SortingState } from '@tanstack/react-table';
import DeleteModal from '../components/DeleteModal';
import ArticleForm from '../components/ArticleForm';
import type { ArticleFormValues } from '../components/ArticleForm';

export default function Article() {
    const [articles, setArticles] = useState<Article[]>([]);
    const { currentPage, handlePageChange } = usePageParam();
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState('');
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
    const debouncedSearch = useDebouncedSearch(search);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingArticle, setEditingArticle] = useState<ArticleDetail | null>(null);


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
    useEffect(() => {
        fetchArticles();
    }, [currentPage, pageSize, debouncedSearch, sorting]);

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
        if (!editingArticle) return;

        try {
            await updateArticle(editingArticle.id, values);

            await fetchArticles();

            setEditingArticle(null);
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

    async function handleOpenEditModal(id: string) {
        try {
            const response =
                await getArticleById(id);

            setEditingArticle(
                response.data.data,
            );
        } catch (error) {
            console.error(error);
        }
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

    const columns = getArticleColumns(handleOpenEditModal, handleOpenDeleteModal);
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

                {showCreateForm && (
                    <ArticleForm
                        onClose={() => setShowCreateForm(false)}
                        onSubmit={handleCreateArticle}
                    />
                )}

                {editingArticle && (
                    <ArticleForm
                        article={editingArticle}
                        onClose={() => setEditingArticle(null)}
                        onSubmit={handleUpdateArticle}
                    />
                )}

            </div>
        </>
    );
}