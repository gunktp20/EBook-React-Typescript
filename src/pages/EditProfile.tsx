import Wrapper from "../assets/wrappers/Login";
import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

function EditProfile() {

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
          <div className="text-[25px] font-[300]">ข้อมูลส่วนตัว</div>
        
          <div className="mt-7">
            {/* Start */}
            <div>
              <label
                htmlFor="website-admin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อเข้าใช้งานระบบ
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
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={true}
                  value="gunktp14"
                ></input>
              </div>
            </div>
            {/*  */}
            <div className="mt-4">
              <label
                htmlFor="website-admin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อีเมลล์
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <MdEmail className="text-[#6b7280]" />
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={true}
                  value="gunktp.dev14@gmail.com"
                ></input>
              </div>
            </div>
            {/*  */}
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
              >
                <option selected value="US">นาย</option>
                <option value="CA">นาง</option>
                <option value="FR">นางสาว</option>
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
                  value="กัตพัตร์"
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
                  value="สมหวัง"
                ></input>
              </div>
            </div>
            {/* End */}

            
          </div>
       
          <button className="w-[100%] h-[42px] bg-primary-500 text-white text-sm rounded-md mt-7 hover:bg-primary-700 transition-all">
            บันทึกข้อมูล
          </button>
          {/* <div className="flex mt-4 justify-end pr-2">
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
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
}

export default EditProfile;
