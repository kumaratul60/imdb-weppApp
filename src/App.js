import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fav from "./components/Fav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/movies"
            element={
              <>
                <Banner />
                <Movies />
                {/* <Pagination /> */}
              </>
            }
          />
          <Route path="favourite" element={<Fav />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
