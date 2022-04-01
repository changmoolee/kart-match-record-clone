import React from "react";
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

const Right = ({ data, isTeam, isRetire }) => {
  // console.log(isTeam);
  // console.log(isExceptRetire);

  const matchDatas = data.matches?.[0].matches;

  let filteringData = (matchData) => {
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
        {matchDatas?.map((matchData, index) => (
          <MatchDetail
            key={index}
            matchData={filteringData(matchData)}
            isTeam={isTeam}
            isRetire={isRetire}
          />
        ))}
      </Matches>
    </Container>
  );
};

export default Right;
