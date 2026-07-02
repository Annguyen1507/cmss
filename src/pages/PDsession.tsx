import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { getSessions, deleteSessions, createSessions, getSessionById, updateSessions } from "../features/pd_session/api/pdsession.service";
import { getSessionColumns } from '../features/pd_session/sessionColumns';
import type { Session } from "../features/pd_session/type"
import usePageParam from '../hooks/usePageParam';
import useDebouncedSearch from '../hooks/useDebouncedSearch';
import type { SortingState } from '@tanstack/react-table';
import DeleteModal from '../components/DeleteModal';
import SessionForm from '../components/SessionForm';
import type { SessionFormValues } from '../components/SessionForm';

export default function PDsession() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const { currentPage, currentSearch, handlePageChange, handleSearch } = usePageParam();
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState(currentSearch);
    const [sessionToDelete, setSessionsToDelete] = useState<Session | null>(null);
    const debouncedSearch = useDebouncedSearch(search);
    const [showCreateForm, setShowCreateForm] = useState(false);
     const [showEditForm, setShowEditForm] = useState(false);
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    async function fetchSessions() {
        setLoading(true);
        try {
            const response = await getSessions({
                page: currentPage,
                limit: pageSize,
                search: currentSearch,
                sorting,
            });

            setSessions(response.data.data);
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
        fetchSessions();
    }, [currentPage, pageSize, currentSearch, sorting]);

    useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch]);

    async function handleCreateSession(values: SessionFormValues) {
            try {
                await createSessions(values);
    
                await fetchSessions();
    
                setShowCreateForm(false);
            } catch (error) {
                console.error(error);
            }
        }
    
        async function handleUpdateSession(
            values: SessionFormValues,
        ) {
            if (!editingSessionId) return;
    
            try {
                await updateSessions(editingSessionId, values);
    
                await fetchSessions();
    
                setShowEditForm(false);
    
                setEditingSessionId(null);
            } catch (error) {
                console.error(error);
            }
        }

    function handleOpenDeleteModal(id: string) {
        const selectedSession = sessions.find(
            (session) => session.id === id,
        );

        if (!selectedSession) return;

        setSessionsToDelete(selectedSession);
    }

    function handleOpenEditModal(id: string) {
    setEditingSessionId(id);
    setShowEditForm(true);
    }

    async function handleDeleteSession() {
        if (!sessionToDelete) return;
        try {
            await deleteSessions([sessionToDelete.id]);

            const response = await getSessions({
                page: currentPage,
                limit: pageSize,
                search: debouncedSearch,
                sorting,
            });

            setSessions(response.data.data);
            setTotalRows(response.data.metadata.totalCount);
            setSessionsToDelete(null);
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

    const columns = getSessionColumns(handleOpenDeleteModal, handleOpenEditModal);
    return (
        <>
            <div className="flex h-full flex-col">
                <Header
                    title="PD Session"
                    buttonText="Create PD Session"
                    search={search}
                    onSearchChange={handleSearchChange}
                    onButtonClick={() => setShowCreateForm(true)}
                />
                <div className="flex-1 overflow-hidden p-6">
                    <div className="h-full overflow-y-auto rounded-sm bg-white">
                        <DataTable
                            columns={columns}
                            data={sessions}
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
                {sessionToDelete && (

                    <DeleteModal
                        title={"Delete PD Session?"}
                        onCancel={() =>
                            setSessionsToDelete(null)
                        }
                        onConfirm={handleDeleteSession}
                    />

                )}

                {showCreateForm && (
                    <SessionForm
                        onClose={() => setShowCreateForm(false)}
                        onSubmit={handleCreateSession}
                    />
                )}

                {showEditForm && (
                    <SessionForm
                        sessionId={editingSessionId ?? undefined}
                        onClose={() => {
                            setEditingSessionId(null)
                            setShowEditForm(false)
                        }}
                        onSubmit={handleUpdateSession}
                    />
                )}

            </div>
        </>
    );
}