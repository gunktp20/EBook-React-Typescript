import Wrapper from "../assets/wrappers/Login";
import { FiTrash } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../services/api";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState<
    { _id: string; name: string; title: string; author: string }[] | null
  >();
  const { token } = useAppSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate();
  const getBooks = async () => {
    try {
      const { data } = await api.get(
        `/books/?query=${search ? search : ""}`,
        config
      );
      console.log(data);
      setBooks(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        const msg =
          typeof err?.response?.data?.message === "object"
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message;
        console.log(msg);
        return;
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (book_id: string) => {
    try {
      await api.delete(`/books/${book_id}`, config);
      getBooks();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        const msg =
          typeof err?.response?.data?.message === "object"
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message;
        console.log(msg);
        return;
      }
    }
  };

  return (
    <Wrapper>
      <Navbar />

      <div className="w-[100%] flex justify-center mt-20">
        <div className="p-5 w-[1200px] ">
          <div className="text-[25px] font-[300]">รายการหนังสือ</div>
          <div className="w-[100%] flex justify-between mt-7 ">
            <Link
              to="/add-book"
              className="h-[38px] flex items-center justify-center bg-primary-500 text-white rounded-lg w-[200px] text-[13px]"
            >
              + เพิ่มรายการหนังสือ
            </Link>
            <form className="flex items-center ">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-[12.5px] h-[38px] rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 pl-4 w-[200px]"
                  placeholder="ค้นหารายการหนังสือ"
                  onChange={(e)=>{
                    setSearch(e.target.value)
                  }}
                />
              </div>
              <button
                onClick={(e)=>{
                  e.preventDefault()
                  getBooks()
                }}
                className="p-2.5 ms-2 text-sm font-medium text-white bg-primary-700 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          {/*  */}
          <table id="books" className="mt-6">
            <tr>
              <th className="w-[20%] text-sm font-[400]">การกระทำ</th>
              <th className="w-[55%] text-sm font-[400]">รายการหนังสือ</th>
              <th className="w-[25%] text-sm font-[400]">ผู้เเต่ง</th>
            </tr>
            {books &&
              books.map((book, index) => {
                console.log(book);
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex">
                        <button
                          onClick={() => {
                            navigate("/edit-book/" + book._id);
                          }}
                          className="bg-primary-500 text-white w-[30px] h-[30px] flex items-center rounded-md justify-center mr-2"
                        >
                          <BiEditAlt />
                        </button>
                        <button
                          onClick={() => {
                            deleteBook(book._id);
                          }}
                          className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                    <td className="text-[12.4px]">{book?.title}</td>
                    <td className="text-[12.4px]">{book?.author}</td>
                  </tr>
                );
              })}
            {/* <tr>
              <td>
                <div className="flex">
                  <button className="bg-primary-500 text-white w-[28px] h-[28px] flex items-center rounded-md justify-center mr-2">
                    <BiEditAlt />
                  </button>
                  <button className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center">
                    <FiTrash />
                  </button>
                </div>
              </td>
              <td className="text-[12.4px]">การสร้าง API ด้วย express.js</td>
              <td className="text-[12.4px]">กัตพัตร์ สมหวัง</td>
            </tr> */}
          </table>
          {/* / */}
        </div>
      </div>
    </Wrapper>
  );
}

export default BookList;
