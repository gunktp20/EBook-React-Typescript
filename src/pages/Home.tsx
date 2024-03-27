import Wrapper from "../assets/wrappers/Home";
import bannder from "../assets/images/banner1920x600-02.jpg";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../services/api";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState<
    { name: string; _id: string }[] | null
  >(null);
  const [books, setBooks] = useState<
    { name: string; coverImage: string; _id: string; title: string }[] | null
  >(null);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getCategories = async () => {
    try {
      const { data } = await api.get("/categories/", config);
      console.log(data);
      setCategories(data);
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

  const getBooks = async () => {
    try {
      const { data } = await api.get(
        `/books/?query=${search ? search : ""}&category=${
          selectedCategory ? selectedCategory : ""
        }`,
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
    getCategories();
    getBooks();
  }, [selectedCategory]);

  return (
    <Wrapper>
      <Navbar />
      <div className="flex w-[100%] h-[300px] justify-center">
        <div className="w-[82%] flex relative">
          <div className="w-[100%] h-[100%] absolute"></div>
          <img src={bannder} className="object-cover w-[100%] object-top"></img>
        </div>
      </div>
      <div className="w-[100%] flex justify-center mb-10">
        <div className="flex mt-8 w-[80%]">
          <div className="w-[400px]">
            {/*  */}
            <form className="max-w-md mx-auto mb-5">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-[11.7px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                  placeholder="ค้นหาหนังสือที่คนสนใจ"
                  required
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    getBooks();
                  }}
                  className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  ค้นหา
                </button>
              </div>
            </form>
            {/*  */}
            <div className="border-[1px] w-[100%] rounded-md">
              {categories &&
                categories?.map((category: { name: string; _id: string }) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedCategory(category._id);
                      }}
                      className=" border-b-[1px] py-3 pl-5 text-[13px] text-primary-500 cursor-pointer select-none"
                    >
                      {category.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-[100%] h-[100px] ml-14 flex flex-col">
            <div className="flex gap-20 py-3">
              <div className="text-primary-500 border-b-primary-500 select-none border-b-[2px] pb-2 text-sm cursor-pointer">
                รายการหนังสือ
              </div>
              <div className="text-gray-400 text-sm cursor-pointer select-none">
                หนังสือแนะนำ
              </div>
              <div className="text-gray-400 text-sm cursor-pointer select-none">
                หนังสือมาใหม่
              </div>
              <div className="text-gray-400 text-sm cursor-pointer select-none">
                Electronic Presentation
              </div>
            </div>
            <div className="grid grid-cols-5 w-[100%] gap-20 mt-10">
              {books?.map((book, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      navigate("/view-pdf/" + book?._id);
                    }}
                  >
                    <img
                      src={book?.coverImage}
                      className="object-cover w-[200px] h-[250px] object-left-top"
                    ></img>
                    <div>{book?.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
