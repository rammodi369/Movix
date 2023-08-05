import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration ,getGenres } from "./store/homeSlice";

import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);
  useEffect(() => {
    fetchApiConfiguration();
    genrescall();
  }, []);

  const fetchApiConfiguration= () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
     const url = {
      backdrop:res.images.secure_base_url+"original",
      poster:res.images.secure_base_url+"original",
      profile:res.images.secure_base_url+"original"

     }
      dispatch(getApiConfiguration(url));
    });
  };
const genrescall =async ()=>{
let pormises=[]
let endPoints=["tv", "movie"]
let allGenres={}
endPoints.forEach((url)=>{
  pormises.push(fetchDataFromApi(`/genre/${url}/list`))
})
const data=await Promise.all(pormises)
data.map(({genres})=>{
  return genres.map((item)=>(allGenres[item.id]=item))
})
dispatch(getGenres(allGenres))
}
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Detail />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
