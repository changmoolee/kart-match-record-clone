import React, { useState } from "react";
import styled from "styled-components";
import MatchDetail from "./MatchDetail";
import gameType from "../data/gameType.json";
import Loading from "./Loading";
import useInfiniteScroll from "../hooks/InfiniteScroll";

const RETIRE_STATUS_MATCH_RANKS = ["0", "99", ""];

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
  height: 200px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
`;

const Target = styled.div``;

const Right = ({ data, isTeam, isRetire }) => {
  const matchDatas = data.matches?.[0].matches;
  const [isLoading, setIsLoading] = useState(false);
  const [matchDatasPiece, setMatchDatas] = useState(matchDatas.slice(0, 10));

  const getMoreData = () => {
    if (
      matchDatasPiece.filter((matchData) => filteringData(matchData) !== null)
        .length !== 0
    ) {
      setIsLoading(true);
      let num = matchDatasPiece.length;
      setTimeout(() => {
        setMatchDatas((matchDatasPiece) =>
          matchDatasPiece.concat(matchDatas.slice(num, num + 10))
        );
        setIsLoading(false);
      }, 500);
    }
  };

  const target = useInfiniteScroll(getMoreData, matchDatasPiece, matchDatas);
  // 무한스크롤

  const filteringData = (matchData) => {
    let matchName = gameType.filter((e) => e.id === matchData.matchType);
    if (isTeam) {
      if (matchName[0].name.slice(-3) === "개인전") {
        return null;
      } else {
        if (
          isRetire &&
          RETIRE_STATUS_MATCH_RANKS.includes(matchData.player.matchRank)
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
          RETIRE_STATUS_MATCH_RANKS.includes(matchData.player.matchRank)
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
          ).length === 0 // 필터링 후 전부 null값이라면
            ? "데이터가 없습니다."
            : !isLoading // 로딩이 안걸린다면 마지막 데이터
            ? `마지막 데이터입니다.`
            : null}
        </LastData>
      </Matches>
      <Target ref={target} />
    </Container>
  );
};

export default Right;
