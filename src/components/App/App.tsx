import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import { fetchNotes } from '../../services/noteService';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data } = useQuery({
    queryKey: ['notes', page, debouncedQuery],
    queryFn: () => fetchNotes(debouncedQuery, page, 12),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearch} />
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage}/>
        <button className={css.button}>Create note +</button>
        {notes.length > 0 && (<NoteList notes={notes} />)}
      </header>
    </div>
  );
}

export default App;
