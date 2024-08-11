import { Navigate, Route, Routes } from "react-router-native";
import AppBar from "./AppBar";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import RepositoryDetail from "./repository/RepositoryDetail";
import RepositoryList from "./repository/RepositoryList";
import ReviewForm from "./repository/ReviewForm";

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={<RepositoryList />}
        />
        <Route
          path="/create-review"
          element={<ReviewForm />}
        />
        <Route
          path="/sign-in"
          element={<SignIn />}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
        />
        <Route
          path="/repository/:id"
          element={<RepositoryDetail />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

export default Main;
