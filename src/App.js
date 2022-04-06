import React, { useState } from "react";
import styled from "styled-components";
import { useGetDatasQuery, useGetMatchDatasQuery } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Main from "./pages/Main";

const BlankMain = styled.div`
  width: 100%;
  height: 800px;
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
      <Header setNickname={setNickname} />
      {isFetching || matchDataIsFetching ? (
        <>
          <Loading />
          <BlankMain>
            <h2>...Fetching</h2>
          </BlankMain>
        </>
      ) : isLoading || matchDataIsLoading ? (
        <>
          <Loading />
          <BlankMain>
            <h2>...Loading</h2>
          </BlankMain>
        </>
      ) : error || matchDataError ? (
        <BlankMain>
          <h2>sth wrong</h2>
        </BlankMain>
      ) : matchDataIsSuccess ? (
        <Main data={matchData} updateData={refetch} />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
