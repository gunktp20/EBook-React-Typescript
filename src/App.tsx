import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  AddBook,
  BookList,
  EditBookFile,
  EditProfile,
  Book,
  EditProfileImage,
  EditBook,
  ViewPDF,
} from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";
import SharedLayout from "./pages/SharedLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home/>}/>
          <Route path="/book-list" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/view-pdf/:id" element={<ViewPDF />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/edit-book-file" element={<EditBookFile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-profile-image" element={<EditProfileImage />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/reset-password/:token" element={<ResetPass />} />
        <Route path="/term-condition" element={<TermAndCondition />} />
        <Route element={<RequireUser />}>
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard-list" element={<DashboardList />} />
          <Route path="/dashboard/:dashboard_id" element={<Dashboard />} />
          <Route path="/add-dashboard" element={<AddDashboard />} />
          <Route path="/device-list" element={<DeviceList />} />
          <Route path="/device/:device_id" element={<Device />} />
          <Route path="/add-device" element={<AddDevice />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/request-verify-email/:token"
          element={<SendVerifyEmail />}
        />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
