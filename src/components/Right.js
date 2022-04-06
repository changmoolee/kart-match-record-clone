import React, { useState } from "react";
import styled from "styled-components";
import MatchDetail from "./MatchDetail";
import gameType from "../data/gameType.json";
import Loading from "./Loading";
import useInfiniteScroll from "../hooks/InfiniteScroll";

const Container = styled.section`
  width: 660px;
  padding: 40px 0;
`;
const Matches = styled.div`
  width: 100%;
  min-height: 800px;
  display: flex;
  flex-direction: column;
`;

const LastData = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Target = styled.div``;

const Right = ({ data, isTeam, isRetire }) => {
  // console.log(isTeam);
  // console.log(isExceptRetire);

  const matchDatas = data.matches?.[0].matches;
  const [isLoading, setIsLoading] = useState(false);
  const [matchDatasPiece, setMatchDatas] = useState(matchDatas.slice(0, 10));

  const getMoreData = async () => {
    setIsLoading(true);
    let num = matchDatasPiece.length;
    await setTimeout(() => {
      setMatchDatas((matchDatasPiece) =>
        matchDatasPiece.concat(matchDatas.slice(num, num + 10))
      );
      setIsLoading(false);
      console.log("get more data!");
    }, 500);
  };
  const target = useInfiniteScroll(getMoreData, matchDatasPiece);
  // 무한스크롤

  const filteringData = (matchData) => {
    let matchName = gameType.filter((e) => e.id === matchData.matchType);
    // console.log(matchName[0].name.slice(-3));
    if (isTeam) {
      if (matchName[0].name.slice(-3) === "개인전") {
        return null;
      } else {
        if (
          isRetire &&
          (matchData.player.matchRank === "" ||
            matchData.player.matchRank === "99")
        ) {
          return null;
        } else {
          return matchData;
        }
      }
    } else {
      if (matchName[0].name.slice(-3) === "개인전") {
        if (
          isRetire &&
          (matchData.player.matchRank === "" ||
            matchData.player.matchRank === "99")
        ) {
          return null;
        } else {
          return matchData;
        }
      } else if (matchName[0].name.slice(-3) === " 팀전") {
        return null;
      }
    }
  };

  return (
    <Container>
      <Matches>
        {matchDatasPiece?.map((matchData, index) => (
          <MatchDetail
            key={index}
            matchData={filteringData(matchData)}
            isTeam={isTeam}
            isRetire={isRetire}
          />
        ))}
        {isLoading ? <Loading /> : null}
        <LastData>
          {matchDatasPiece.filter(
            (matchData) => filteringData(matchData) !== null
          ).length === 100
            ? "최근 100개 데이터입니다."
            : matchDatasPiece.filter(
                (matchData) => filteringData(matchData) !== null
              ).length === 0
            ? "데이터가 없습니다."
            : `마지막 데이터입니다.`}
        </LastData>
      </Matches>
      <Target ref={target}></Target>
    </Container>
  );
};

export default Right;
