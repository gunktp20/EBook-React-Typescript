import Wrapper from "../assets/wrappers/Login";
import { FaLock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useState } from "react";
import { Alert } from "@mui/material";
import { AxiosError } from "axios";
import api from "../services/api";
import { setCredential } from "../features/auth/authSlice";

interface IValue {
  username: string;
  titleName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "info" | "error">(
    "error"
  );
  const [alertText, setAlertText] = useState<string>("");

  const initialState: IValue = {
    username: "",
    titleName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [values, setValues] = useState<IValue>(initialState);

  const onSubmit = async () => {
    const {
      username,
      titleName,
      firstName,
      lastName,
      email,
      password,
      confirm_password,
    } = values;
    if (
      !username ||
      !titleName ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirm_password
    ) {
      setAlertText("กรุณากรอกข้อมูลให้ครบถ้วน");
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    if (password !== confirm_password) {
      setAlertText("รหัสผ่านสำหรับการยืนยันต้องตรงกับรหัสผ่าน");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    try {
      const { data } = await api.post("/auth/register", values);
      await dispatch(setCredential(data))
      navigate('/')
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

  return (
    <Wrapper>
      <div className="bg-white shadow-sm w-[100%] justify-center flex">
        <div className="w-[82%] flex justify-between px-8 py-3 items-center">
          <div className="text-primary-700 text-[20px] font-[400] flex gap-2 items-center">
            MTU
          </div>
          <button
            onClick={() => {}}
            className="text-[13.5px] text-primary-800 font-[300] border-primary-800 px-5 py-3 rounded-[100px]"
          >
            เข้าสู่ระบบ / ลงทะเบียน
          </button>
        </div>
      </div>

      <div className="w-[100%] flex justify-center mt-10">
        <div className="p-5 w-[500px]">
          <div className="text-[25px] font-[300]">ลงทะเบียน</div>
          <div className="text-[12px] text-gray-500">
            ลงทะเบียนด้วยข้อมูลของคุณกรุณากรอกข้อมูลที่เป็นความจริง
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

          <div className="mt-7">
            {/* Start */}
            <div>
              <label
                htmlFor="website-admin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อผู้ใช้
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  name="username"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="กรอกชื่อผู้ใช้"
                ></input>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ข้อมูลผู้ใช้
              </label>
              <select
                id="default"
                className="bg-gray-50 pl-3 border border-gray-300 text-gray-600 mb-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="titleName"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="" selected>
                  คำนำหน้าชื่อ
                </option>
                <option value="อาจารย์">อาจารย์</option>
                <option value="อาจารย์ดร">อาจารย์ดร</option>
                <option value="ผู้ช่วยศาสตราจารย์">ผู้ช่วยศาสตราจารย์</option>
                <option value="รองศาสตราจารย์">รองศาสตราจารย์</option>
                <option value="ศาสตราจารย์">ศาสตราจารย์</option>
              </select>
            </div>
            {/* End */}

            {/* Start */}
            <div className="">
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <IoPersonSharp className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ชื่อ"
                  name="firstName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="mt-3">
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <IoPersonOutline className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="นามสกุล"
                  name="lastName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div>
              <label
                htmlFor="website-admin"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                E-mail
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <MdEmail className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="กรอกที่อยู่อีเมลล์"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            {/* Start */}
            <div>
              <label
                htmlFor="website-admin"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <FaLock className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div>
              <label
                htmlFor="website-admin"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <FaLock className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ยืนยันรหัสผ่านของคุณ"
                  name="confirm_password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            {/* End */}
          </div>
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
              คุณยอมรับ ข้อกำหนด เเละ เงื่อนไข ของเว็ปไซต์หรือไม่
            </label>
          </div>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="w-[100%] h-[42px] bg-primary-500 text-white text-sm rounded-md mt-7 hover:bg-primary-700 transition-all"
          >
            ยืนยันการลงทะเบียน
          </button>
          <div className="flex mt-4 justify-end pr-2">
            <p className="text-[12px] text-[#333]">หากคุณเป็นสมาชิกอยู่เเล้ว</p>

            <button
              className="text-[12px] ml-2 text-[#3173B1] bg-none cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
              id="toggle-endpoint"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Register;
