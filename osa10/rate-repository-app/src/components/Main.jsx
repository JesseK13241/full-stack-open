import { Navigate, Route, Routes } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryDetail from "./RepositoryDetail";
import RepositoryList from "./RepositoryList";
import ReviewForm from "./ReviewForm";
import SignIn from "./SignIn";

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
