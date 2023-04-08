import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from ".";
import { Home, FullPost, Registration, AddPost, Login } from "../pages";
import { fetchUserMe } from "../redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<h1>Неверный адрес страницы</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
