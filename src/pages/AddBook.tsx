import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Login";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { AxiosError } from "axios";
import { useAppSelector } from "../app/hooks";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IValue {
  title: string;
  author: string;
  authorWebsite: string;
  publisher: string;
  ISBN: string;
}

const initialState: IValue = {
  title: "",
  author: "",
  authorWebsite: "",
  publisher: "",
  ISBN: "",
};

function AddBook() {
  const navigate = useNavigate();
  const [values, setValues] = useState<IValue>(initialState);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    { name: string; _id: string }[] | null
  >(null);
  const [category, setCategory] = useState<string>("");
  const { token } = useAppSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "info" | "error">(
    "error"
  );
  const [alertText, setAlertText] = useState<string>("");
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

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setCoverImage(selectedFile);
    }
  };

  const handleBookFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setBookFile(selectedFile);
    }
  };

  const onSubmit = async () => {
    const { title, author, authorWebsite, publisher, ISBN } = values;
    if (
      !category ||
      !title ||
      !author ||
      !authorWebsite ||
      !publisher ||
      !ISBN ||
      !coverImage ||
      !bookFile
    ) {
      setAlertText("กรุณากรอกข้อมูลให้ครบถ้วน");
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("authorWebsite", authorWebsite);
    formData.append("publisher", publisher);
    formData.append("ISBN", ISBN);
    formData.append("coverImage", coverImage);
    formData.append("bookFile", bookFile);
    try {
      console.log(bookFile);
      console.log(coverImage);
      const { data } = await api.post("/books/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
      navigate("/book-list");
      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        const msg =
          typeof err?.response?.data?.message === "object"
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message;
        setAlertText(msg);
        setAlertType("error");
        setShowAlert(true);
        return;
      }
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Wrapper>
      <Navbar />

      <div className="w-[100%] flex justify-center mt-5">
        <div className="p-5 w-[500px]">
          <div className="text-[25px] font-[300]">เพิ่มข้อมูลหนังสือ</div>
          <div className="text-[12px] text-gray-500">
            กรอกรายละเอียดหนังสือของคุณ
          </div>
          {showAlert && (
            <Alert
              sx={{
                fontSize: "11.5px",
                marginTop: "1rem",
                alignItems: "center",
              }}
              severity={alertType}
            >
              {alertText}
            </Alert>
          )}

          <div>
            <label
              htmlFor="default"
              className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมวดหมู่หนังสือ
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option selected value="">
                - เลือกหมวดหมู่หนังสือ
              </option>
              {categories &&
                categories.map((category: { _id: string; name: string }) => {
                  return (
                    <option value={`${category._id}`}>{category.name}</option>
                  );
                })}
            </select>
          </div>
          {/* Start Form Row  */}
          <div>
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ชื่อหนังสือ
            </label>
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกข้อมูลชื่อหนังสือ"
              name="title"
              onChange={handleChange}
            ></input>
          </div>
          {/* End Form Row  */}
          {/* Start Form Row  */}
          <div className="mt-4">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ผู้เเต่งหนังสือ
            </label>
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกข้อมูลผู้เเต่งหนังสือ"
              name="author"
              onChange={handleChange}
            ></input>
          </div>
          {/* End Form Row  */}
          {/* Start Form Row  */}
          <div className="mt-4">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              เว็ปไซต์ผู้เเต่งหนังสือ
            </label>
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกข้อมูลเว็ปไซต์ผู้เเต่งหนังสือ"
              name="authorWebsite"
              onChange={handleChange}
            ></input>
          </div>
          {/* End Form Row  */}

          <div
            className="flex items-center p-4 mt-5 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="publisher"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only"></span>
            <div>
              <span className="font-medium"></span>การเพิ่มผู้เเต่งหนังสือ
              เเละเว็ปไซต์ผู้เเต่งหนังสือ หากมีมากกว่า 1 คนให้ใช้ เครื่องหมาย ,
              คั่นระหว่างชื่อ
            </div>
          </div>
          {/* Start Form Row  */}
          <div className="mt-4">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สำนักพิมพ์
            </label>
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกข้อมูลสำนักพิมพ์"
              name="publisher"
              onChange={handleChange}
            ></input>
          </div>
          {/* End Form Row  */}
          {/* Start Form Row  */}
          <div className="mt-4">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ISBN
            </label>
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกข้อมูล ISBN"
              name="ISBN"
              onChange={handleChange}
            ></input>
          </div>
          {/* End Form Row  */}

          {/*  */}
          <div className="mt-5">
            {/* <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="bg-primary-500"
            >
              อัพโหลดไฟล์
              <VisuallyHiddenInput type="file" />
            </Button> */}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Cover Image
            </label>
            <input
              className="flex w-full py-[7px] px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="coverImage"
              accept="image/gif, image/jpeg, image/png"
              onChange={handleCoverImageChange}
            ></input>
          </div>
          {/*  */}

          {/*  */}
          <div className="mt-5">
            {/* <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="bg-primary-500"
            >
              อัพโหลดไฟล์
              <VisuallyHiddenInput type="file" />
            </Button> */}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload Book file
            </label>
            <input
              className="flex w-full py-[7px] px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="bookFile"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={handleBookFileChange}
            ></input>
          </div>
          {/*  */}

          <div className="flex items-center mt-5">
            <input
              id="link-checkbox"
              type="checkbox"
              name="retain"
              // onChange={() => setRetain((prev) => !prev)}
              checked={true}
              className=" w-[15px] h-[15px] text-[#2CB1BC] bg-gray-100 border-gray-300 rounded focus:ring-[#ffffff00] focus:ring-2"
            />
            <label
              htmlFor="link-checkbox"
              className="ms-2 text-[11.6px] mr-2 font-[200] text-[#1D4469]"
            >
              เป็นหนังสือตัวอย่างไม่ใช่เล่มเต็ม
            </label>
          </div>
          <button
            onClick={onSubmit}
            className="h-[42px] bg-primary-500 text-white w-[100%] rounded-md mt-3 mb-5"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default AddBook;
