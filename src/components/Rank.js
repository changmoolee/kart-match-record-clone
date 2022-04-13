import React from "react";
import styled from "styled-components";
import RankGraph from "./RankGraph";

const RETIRE_STATUS_MATCH_RANKS = ["0", "99", ""];

const Container = styled.section`
  width: 350px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  margin-right: 10px;
  background: white;
  box-sizing: border-box;
`;
const Heading = styled.header`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  color: #1f334a;
  box-sizing: border-box;
`;
const Title = styled.div``;
const Blue = styled.span`
  color: #2877ff;
`;
const Black = styled.span``;

const Total = styled.div`
  font-size: 12px;
  color: #1f334a;
  letter-spacing: -1px;
`;

const Rank = ({ data }) => {
  let matchDatas = data.matches[0].matches;

  let rankDatas = [];
  matchDatas.map((matchData) => rankDatas.push(matchData.player.matchRank));
  rankDatas = rankDatas.map((rankdata) =>
    RETIRE_STATUS_MATCH_RANKS.includes(rankdata) ? "8" : rankdata
  );

  return (
    <Container>
      <Heading>
        <Title>
          <Blue>순위 변동</Blue> <Black>추이</Black>
        </Title>
        <Total>
          지난 100경기 &nbsp;
          <Blue>
            {rankDatas.reduce((acc, cur) => Number(acc) + Number(cur)) / 100 +
              "위"}
          </Blue>
          &nbsp; 최근 50경기 &nbsp;
          <Blue>
            {rankDatas
              .slice(0, 50)
              .reduce((acc, cur) => Number(acc) + Number(cur)) /
              50 +
              "위"}
          </Blue>
        </Total>
      </Heading>
      <RankGraph rankDatas={rankDatas} />
    </Container>
  );
};

export default Rank;
