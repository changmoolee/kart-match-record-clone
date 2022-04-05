import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MatchDetail from "./MatchDetail";
import gameType from "../data/gameType.json";

const Container = styled.section`
  width: 660px;
  padding: 40px 0;
`;
const Matches = styled.div`
  width: 100%;
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

const Right = ({ data, isTeam, isRetire }) => {
  // console.log(isTeam);
  // console.log(isExceptRetire);

  const matchDatas = data.matches?.[0].matches;
  const [target, setTarget] = useState(null);
  const [matchDatasPiece, setMatchDatas] = useState(matchDatas.slice(0, 10));

  const getMoreData = () => {
    let num = matchDatasPiece.length;
    setMatchDatas((matchDatasPiece) =>
      matchDatasPiece.concat(matchDatas.slice(num, num + 10))
    );
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      if (matchDatasPiece.length < 100) {
        await setTimeout(() => getMoreData(), 500);
        console.log("more 10 datas");
      }
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.8,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, matchDatasPiece]);

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
      </Matches>

      <LastData ref={setTarget}>
        {matchDatasPiece.length === 100 ? "최근 100개 데이터입니다." : null}
      </LastData>
    </Container>
  );
};

export default Right;
