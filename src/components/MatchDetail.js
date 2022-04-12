import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import MatchDetailContent from "./MatchDetailContent";
import { convertTrackId, convertKart, convertRecord } from "./convert";

const RETIRE_STATUS_MATCH_RANKS = ["0", "99", ""];
const RETIRE_COLOR = "#f62459";
const WINNDER_COLOR = "#0277ff";
const NORMAL_COLOR = "#8893a2";

const MatchBox = styled.section`
  display: flex;
  flex-direction: column;
`;

const Match = styled.div`
  width: 100%;
  height: 88px;
  display: grid;
  grid-template-columns: 65px 150px 150px 150px 100px 40px;
  margin-bottom: 5px;
  border-left: ${({ rank }) =>
    RETIRE_STATUS_MATCH_RANKS.includes(rank)
      ? `4px solid ${RETIRE_COLOR}`
      : rank === "1"
      ? "4px solid #0277ff"
      : `4px solid ${NORMAL_COLOR}`};
  color: "#1f334a";
  background: ${({ rank }) =>
    RETIRE_STATUS_MATCH_RANKS.includes(rank)
      ? "#fbf0f2"
      : rank === "1"
      ? "#eff3fb"
      : "white"};
`;
const Type = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
const Result = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  font-size: 30px;
  font-weight: 700;
  font-style: italic;
  color: ${({ rank }) =>
    RETIRE_STATUS_MATCH_RANKS.includes(rank)
      ? `${RETIRE_COLOR}`
      : rank === "1"
      ? `${WINNDER_COLOR}`
      : "#1f334a"};
  opacity: ${({ rank }) =>
    RETIRE_STATUS_MATCH_RANKS.includes(rank)
      ? "1"
      : rank === "1"
      ? "1"
      : "0.5"};
  box-sizing: border-box;
`;
const ResultTotal = styled.span`
  margin-left: 5px;
  margin-bottom: -10px;
  font-size: 16px;
  font-style: italic;
`;
const Track = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Kart = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Time = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const Open = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  opacity: 0.3;
  cursor: pointer;
  :hover {
    background: ${({ rank }) =>
      RETIRE_STATUS_MATCH_RANKS.includes(rank)
        ? `${RETIRE_COLOR}`
        : rank === "1"
        ? `${WINNDER_COLOR}`
        : `${NORMAL_COLOR}`};
  }
`;

const MatchDetail = ({ matchData }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetail = () => {
    setDetailOpen((detailOpen) => !detailOpen);
  };

  console.log(matchData.player.matchRank);
  return matchData === null ? null : (
    <MatchBox>
      <Match rank={matchData.player.matchRank}>
        <Type>
          {formatDistanceToNow(new Date(matchData.endTime), { locale: ko }) +
            " 전"}
        </Type>
        <Result rank={matchData.player.matchRank}>
          {RETIRE_STATUS_MATCH_RANKS.includes(matchData.player.matchRank) ? (
            "#리타이어"
          ) : (
            <>
              #{Number(matchData.player.matchRank)}
              <ResultTotal>/{matchData.playerCount}</ResultTotal>
            </>
          )}
        </Result>
        <Track>{convertTrackId(matchData.trackId)}</Track>
        <Kart>{convertKart(matchData.player.kart)}</Kart>
        <Time>{convertRecord(matchData.player.matchTime)}</Time>
        <Open rank={matchData.player.matchRank} onClick={() => handleDetail()}>
          <FontAwesomeIcon icon={faCaretDown} />
        </Open>
      </Match>
      {detailOpen ? <MatchDetailContent matchData={matchData} /> : null}
    </MatchBox>
  );
};

export default MatchDetail;
