import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Main from "./pages/Main";
import { useGetUserQuery, useGetMatchesQuery } from "./services/user";

const BlankMain = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  justify-content: center;
`;
const BlankDesc = styled.div`
  margin-top: 300px;
`;

const DEFAULT_NICKNAME = "BBEESSTT"; // TODO: 검색 기능이 추가되면 동적으로 닉네임을 변화시키기

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [nickname, setNickname] = useState(DEFAULT_NICKNAME);

  const { data, error, isLoading, isFetching, refetch } =
    useGetUserQuery(nickname);

  const {
    data: matchData,
    error: matchDataError,
    isLoading: matchDataIsLoading,
    isFetching: matchDataIsFetching,
    isSuccess: matchDataIsSuccess,
  } = useGetMatchesQuery(data?.accessId);

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
            <BlankDesc>
              <h2>에러가 발생했습니다!</h2>
              <h2>불편을 드려 죄송합니다.</h2>
            </BlankDesc>
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
                  <BlankDesc>
                    <h2>잘못된 경로입니다.</h2>
                  </BlankDesc>
                </BlankMain>
              }
            />
            <Route
              path="/blank"
              element={
                <BlankMain>
                  <BlankDesc>
                    <h2>서비스 되지 않습니다.</h2>
                  </BlankDesc>
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
