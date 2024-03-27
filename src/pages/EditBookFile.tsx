import Wrapper from "../assets/wrappers/Login";

function EditBookFile() {
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

      <div className="w-[100%] flex justify-center mt-5">
        <div className="p-5 w-[500px]">
          <div className="text-[25px] font-[300]">เเก้ไขเเฟ้มข้อมูลหนังสือ</div>
          <div className="text-[12px] text-gray-500">
            กรอกข้อมูลเพื่อเเก้ไขข้อมูลหนังสือของคุณ
          </div>
          {/* Start Form Row  */}
          <div className="mt-5">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ชื่อหนังสือหรือบทย่อย
            </label>
            <input
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="เนื้อหา"
            ></input>
          </div>
          {/* End Form Row  */}

          <div className="mt-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="flex w-full py-[7px] px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            ></input>
          </div>
          {/*  */}
          <button className="h-[42px] bg-primary-500 text-white w-[100%] rounded-md mt-3 mb-5">
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default EditBookFile;
