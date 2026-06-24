import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { getArticles } from '../api/article.service';
import { articleColumns } from '../features/article/articleColumns';
import type { Article } from '../features/article/type';
import usePageParam from '../hooks/usePageParam';

export default function Article() {
    const [articles, setArticles] = useState<Article[]>([]);
    const {currentPage, handlePageChange} = usePageParam();

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await getArticles();

                setArticles(response.data.data);

                console.log(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
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
                            columns={articleColumns}
                            data={articles}
                            page={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}