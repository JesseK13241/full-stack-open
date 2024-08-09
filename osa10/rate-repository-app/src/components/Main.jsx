import { Navigate, Route, Routes } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryDetail from "./RepositoryDetail";
import RepositoryList from "./RepositoryList";
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
