import Wrapper from "../assets/wrappers/Login";
import previewImg from "../assets/images/preview-profile-image.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import api from "../services/api";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";
import Navbar from "../components/Navbar";

function EditProfileImage() {
  const [profile, setProfile] = useState<File | null>(null);
  const { token } = useAppSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "info" | "error">(
    "error"
  );
  const [userInfo, setUserInfo] = useState<{ profileUrl: string } | null>(null);
  const [alertText, setAlertText] = useState<string>("");
  const config = {
    // headers: { "Content-Type": "multipart/form-data" },
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setProfile(selectedFile);
    }
  };

  const onSubmit = async () => {
    if (!profile) {
      setAlertText("กรุณาเลือกไฟล์รูปภาพโปรไฟล์ของคุณ");
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    const formData = new FormData();
    formData.append("profile", profile);
    try {
      const { data } = await api.patch("/users/", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      await getUserInfo()
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
    <Wrapper>
      <Navbar />

      <div className="w-[100%] flex justify-center mt-5">
        <div className="p-5 w-[500px]">
          <div className="text-[25px] font-[300]">อัพเดตรูปประจำตัว</div>
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
          <div
            className="flex items-center p-4 mt-5 mb-4 text-sm text-primary-800 border border-primary-300 rounded-lg bg-primary-50 dark:bg-gray-800 dark:text-primary-400 dark:border-primary-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only"></span>
            <div>
              <span className="font-medium"></span>เฉพาะไฟล์ประเภท jpg,png
              เเละรูปต้องมีขนาดไม่เกิน 1MB
            </div>
          </div>
          {/*Start Preview IMG*/}
          <div className="w-[100%] flex justify-center py-5">
            {userInfo?.profileUrl ? (
              <img
                src={userInfo?.profileUrl}
                className="rounded-lg object-cover w-[200px] h-[200px]"
              ></img>
            ) : (
              <div className="w-[200px] h-[100px] flex justify-center items-center text-sm text-gray-400">
                ยังไม่มีรูป Profile นะจ้ะ
              </div>
            )}
          </div>
          {/* End Preview IMG */}
          <div className="mt-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              เลือกรูปประจำตัว
            </label>
            <input
              className="flex w-full py-[7px] px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="profile"
              accept="image/jpeg, image/png"
              onChange={handleProfileImageChange}
            ></input>
          </div>
          {/*  */}
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

export default EditProfileImage;
