import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";

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
