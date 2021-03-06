import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGetUserQuery } from "./services/user";
import { useGetMatchlistQuery } from "./services/user";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Main from "./pages/Main";

const BlankMain = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  justify-content: center;
`;
const BlankDesc = styled.div`
  margin-top: 200px;
  font-size: 24px;
  line-height: 36px;
`;

const DEFAULT_NICKNAME = "BBEESSTT";

function App() {
  const [nickname, setNickname] = useState(DEFAULT_NICKNAME);

  const { data, error, isLoading, isFetching, refetch } =
    useGetUserQuery(nickname);

  const {
    data: matchlist,
    error: matchlistError,
    isLoading: matchlistIsLoading,
    isFetching: matchlistIsFetching,
    isSuccess: matchlistIsSuccess,
  } = useGetMatchlistQuery(data?.accessId);

  return (
    <div className="App">
      <BrowserRouter>
        <Header setNickname={setNickname} />
        {isFetching || matchlistIsFetching ? (
          <>
            <Loading />
            <BlankMain />
          </>
        ) : isLoading || matchlistIsLoading ? (
          <>
            <Loading />
            <BlankMain />
          </>
        ) : error || matchlistError ? (
          <BlankMain>
            <BlankDesc>
              에러가 발생했습니다! <br />
              불편을 드려 죄송합니다.
            </BlankDesc>
          </BlankMain>
        ) : matchlistIsSuccess ? (
          <Routes>
            <Route
              path="/"
              element={<Main data={matchlist} updateData={refetch} />}
            />
            <Route
              path="*"
              element={
                <BlankMain>
                  <BlankDesc>잘못된 경로입니다.</BlankDesc>
                </BlankMain>
              }
            />
            <Route
              path="/blank"
              element={
                <BlankMain>
                  <BlankDesc>
                    서비스 되지 않습니다.
                    <br />
                    '홈'을 클릭해주세요!
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
