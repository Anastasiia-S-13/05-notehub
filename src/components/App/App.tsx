import { keepPreviousData, useQuery} from "@tanstack/react-query"
import css from "./App.module.css"
import SearchBox from "../SearchBox/SearchBox"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import NoteList from "../NoteList/NoteList"
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import Pagination from "../Pagination/Pagination"
import { fetchNotes } from "../../services/noteService"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import toast, { Toaster } from "react-hot-toast"

export default function App() {
    const [inputValue, setInputValue] = useState<string>(""); 
    const [searchWord, setSearchWord] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const updateSearchWord = useDebouncedCallback((value: string) => {
    setSearchWord(value);
    setPage(1);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);       // оновлюємо інпут одразу
    updateSearchWord(value);    // оновлюємо searchWord із затримкою
  };


    const { data, isFetching, isError } = useQuery({
        queryKey: ['notes', searchWord, page],
        queryFn: () => fetchNotes(searchWord, page),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.notes.length === 0) {
         toast.error("Not found...")
    }
   }, [data])


    return <div className={css.app}>
        <header className={css.toolbar}>
            <SearchBox onChange={handleChange} value={inputValue}/>
            {data && data?.totalPages > 1 && <Pagination totalPages={data?.totalPages ?? 0} page={page} onPageChange={(newPage) => setPage(newPage)} />}
            <button className={css.button} onClick={handleOpenModal}>Create note +</button>
        </header>
        {isFetching && <Loader />}
        {isError && <ErrorMessage />}
        <Toaster/>
       {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {openModal && (
            <Modal onClose={handleCloseModal}>
                <NoteForm onClose={handleCloseModal}/>
            </Modal>
        )}
    </div>
};