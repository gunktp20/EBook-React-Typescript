import Wrapper from "../assets/wrappers/Login";
import b1 from "../assets/images/b1.jpg";
import { BiEditAlt } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import Navbar from "../components/Navbar";

function Book() {
  return (
    <Wrapper>
      <Navbar />

      <div className="flex justify-center mt-14">
        <div className="w-[60%] flex  justify-between">
          {/* Start Banner Book */}
          <div className="mr-16">
            <img src={b1}></img>
          </div>
          {/* End Banner Book*/}
          {/* Start Book Info */}
          <div className=" w-[100%]">
            <div className="font-[400] text-[25px] border-b-[1px] w-[100%] pb-3">
              การใช้งาน React.js เบื้องต้น
            </div>
            <div className="flex flex-col mt-6">
              <div className="flex py-3 text-sm">
                <label className="font-[400] mr-12 w-[260px]">
                  หมวดหมู่หนังสือ
                </label>
                <p className="">คอมพิวเตอร์</p>
              </div>
              <div className="flex py-3 text-sm">
                <label className="font-[400] mr-12 w-[260px]">
                  ผู้เเต่งหนังสือ
                </label>
                <p>กัตพัตร์ สมหวัง</p>
              </div>
              <div className="flex py-3 text-sm">
                <label className="font-[400] mr-12 w-[260px]">
                  สำนักพิมพ์หนังสือ
                </label>
                <p>มหาวิทยาลัยราชภัฏนครปฐม</p>
              </div>
              <div className="flex py-3 text-sm">
                <label className="font-[400] mr-12 w-[260px]">ISBN</label>
                <p>9786165770958</p>
              </div>
              <div className="flex py-3 text-sm">
                <label className="font-[400] mr-12 w-[260px]">
                  จำนวนผู้อ่าน
                </label>
                <p>2840</p>
              </div>
            </div>
            <div className="w-[100%] flex justify-between mt-7 ">
              <button className="h-[38px] bg-primary-500 text-white rounded-lg w-[200px] text-[13.3px]">
                + เพิ่มเเฟ้มข้อมูลหนังสือ
              </button>
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
                    placeholder="ค้นหาเเฟ้มข้อมูล"
                    required
                  />
                </div>
                <button
                  type="submit"
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
                <th className="w-[55%] text-sm font-[400]">รายการ</th>
              </tr>
              <tr>
                <td>
                  <div className="flex">
                    <button className="bg-primary-500 text-white w-[30px] h-[30px] flex items-center rounded-md justify-center mr-2">
                      <BiEditAlt />
                    </button>
                    <button className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center">
                      <FiTrash />
                    </button>
                  </div>
                </td>
                <td className="text-[12.4px]">ปกหน้า</td>
              </tr>
              <tr>
                <td>
                  <div className="flex">
                    <button className="bg-primary-500 text-white w-[30px] h-[30px] flex items-center rounded-md justify-center mr-2">
                      <BiEditAlt />
                    </button>
                    <button className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center">
                      <FiTrash />
                    </button>
                  </div>
                </td>
                <td className="text-[12.4px]">ปกหลัง</td>
              </tr>
              <tr>
                <td>
                  <div className="flex">
                    <button className="bg-primary-500 text-white w-[30px] h-[30px] flex items-center rounded-md justify-center mr-2">
                      <BiEditAlt />
                    </button>
                    <button className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center">
                      <FiTrash />
                    </button>
                  </div>
                </td>
                <td className="text-[12.4px]">ปกในเเละลิขสิทธ์</td>
              </tr>
              <tr>
                <td>
                  <div className="flex">
                    <button className="bg-primary-500 text-white w-[30px] h-[30px] flex items-center rounded-md justify-center mr-2">
                      <BiEditAlt />
                    </button>
                    <button className="bg-[#dc3c45] text-white w-[28px] h-[28px] flex items-center rounded-md justify-center">
                      <FiTrash />
                    </button>
                  </div>
                </td>
                <td className="text-[12.4px]">เนื้อหา</td>
              </tr>
            </table>
            {/* / */}
          </div>

          {/* End Book Info */}
        </div>
      </div>
    </Wrapper>
  );
}

export default Book;
