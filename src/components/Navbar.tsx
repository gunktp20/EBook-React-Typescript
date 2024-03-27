import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FaChevronDown } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { logout } from "../features/auth/authSlice";
import api from "../services/api";
import { AxiosError } from "axios";

function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isBookMenuOpen, setBookMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null>(null);
  const { token } = useAppSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getUserInfo = async () => {
    try {
      const { data } = await api.get(`/users`, config);
      console.log(data);
      setUserInfo(data);
      return;
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
    getUserInfo();
  }, []);

  return (
    <div className="bg-white shadow-sm w-[100%] justify-center flex">
      <div className="w-[82%] flex justify-between px-8 py-3 items-center">
        <div className="text-primary-700 cursor-pointer text-[20px] font-[400] flex gap-2 items-center">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            MTU
          </div>
          {user && (
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className=" relative font-[300] text-gray-700 w-fi rounded-lg text-[400] text-[12.6px] px-8 py-2.5 text-center inline-flex items-center "
              type="button"
              onClick={() => {
                setBookMenuOpen(!isBookMenuOpen);
              }}
            >
              <div className="flex text-[13.5px] items-center">
                หนังสือ
                <FaChevronDown className="ml-2 text-[10px]" />
              </div>
              <div
                id="dropdownInformation2"
                className={`z-10 ${
                  isBookMenuOpen ? "block" : "hidden"
                } top-[2.8rem] left-0 absolute bg-white divide-y overflow-hidden divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 `}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownInformationButton"
                >
                  <li>
                    <Link
                      to="/book-list"
                      className="text-[12.5px] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      รายการหนังสือ
                    </Link>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      className="block text-[12.5px] px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      รายการงานนำเสนอ
                    </a>
                  </li> */}
                </ul>
              </div>
            </button>
          )}
        </div>
        {user ? (
          <button
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            className=" relative font-[300] text-gray-700 w-fi rounded-lg text-[400] text-[12.6px] px-8 py-2.5 text-center inline-flex items-center "
            type="button"
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
            }}
          >
            <IoPersonCircleSharp className="text-[30px] text-primary-700 mr-2" />
            gunktp14{" "}
            <div
              id="dropdownInformation"
              className={`z-10 ${
                isUserMenuOpen ? "block" : "hidden"
              } top-[2.8rem] left-0 absolute bg-white divide-y overflow-hidden divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 `}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="text-[12.5px]">{`${userInfo?.firstName} ${userInfo?.lastName}`}</div>
                <div className="font-medium truncate text-[12.5px]">
                  {userInfo?.email}
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <a
                     onClick={() => {
                      navigate("/profile");
                    }}
                    className="text-[12.5px] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ข้อมูลส่วนตัว
                  </a>
                </li>
                <li>
                  <a
                    onClick={()=>{
                      navigate('/edit-profile-image')
                    }}
                    className="block text-[12.5px] px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    อัพเดทรูปประจำตัว
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-[12.5px] px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    ตัวเลือก
                  </a>
                </li>
              </ul>
              <div className="">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Sign out
                </a>
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-[13.5px] text-primary-800 font-[300] border-primary-800 px-5 py-3 rounded-[100px]"
          >
            เข้าสู่ระบบ / ลงทะเบียน
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
