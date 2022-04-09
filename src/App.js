import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGetDatasQuery, useGetMatchDatasQuery } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Main from "./pages/Main";

const BlankMain = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50;
`;

function App() {
  window.scrollTo(0, 0);
  const [nickname, setNickname] = useState("BBEESSTT");

  const { data, error, isLoading, isFetching, refetch } =
    useGetDatasQuery(nickname);

  // console.log(data);

  const {
    data: matchData,
    error: matchDataError,
    isLoading: matchDataIsLoading,
    isFetching: matchDataIsFetching,
    isSuccess: matchDataIsSuccess,
  } = useGetMatchDatasQuery(data?.accessId);

  // console.log(matchData);

  return (
    <div className="App">
      <BrowserRouter>
        <Header setNickname={setNickname} />
        {isFetching || matchDataIsFetching ? (
          <>
            <Loading />
            <BlankMain />
          </>
        ) : isLoading || matchDataIsLoading ? (
          <>
            <Loading />
            <BlankMain />
          </>
        ) : error || matchDataError ? (
          <BlankMain>
            <h2>에러가 발생했습니다!</h2>
            <h2>불편을 드려 죄송합니다.</h2>
          </BlankMain>
        ) : matchDataIsSuccess ? (
          <Routes>
            <Route
              path="/"
              element={<Main data={matchData} updateData={refetch} />}
            />
            <Route
              path="/*"
              element={
                <BlankMain>
                  <h2>잘못된 경로입니다.</h2>
                </BlankMain>
              }
            />
            <Route
              path="/blank"
              element={
                <BlankMain>
                  <h2>서비스 되지 않습니다.</h2>
                </BlankMain>
              }
            />
          </Routes>
        ) : null}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
