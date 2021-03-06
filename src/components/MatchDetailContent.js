import React from "react";
import styled from "styled-components";
import { useGetMatchQuery } from "../services/match";
import SkeletonUI from "./SkeletonUI";
import { convertRecord } from "./convert";

const RETIRE_STATUS_MATCH_RANKS = ["0", "99", ""];
const WINNDER_FONT_COLOR = "#0277ff";
const RETIRE_FONT_COLOR = "red";
const NORMAL_FONT_COLOR = "black";
const MY_TOP_BACKGROUND_COLOR = "#e5ecf6";
const OTHERS_BACKGROUND_COLOR = "#f2f2f2";

const Details = styled.section`
  width: 100%;
  height: 175px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

const Detail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? "700" : "400"};
`;

const DetailRank = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ matchRank }) =>
    RETIRE_STATUS_MATCH_RANKS.includes(matchRank)
      ? `${RETIRE_FONT_COLOR}`
      : matchRank === "1"
      ? `${WINNDER_FONT_COLOR}`
      : `${NORMAL_FONT_COLOR}`};
  background: ${({ myAccountNo, accountNo, matchRank }) =>
    (matchRank === "1") & (myAccountNo === accountNo)
      ? `${MY_TOP_BACKGROUND_COLOR}`
      : `${OTHERS_BACKGROUND_COLOR}`};
`;

const DetailKart = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? `${OTHERS_BACKGROUND_COLOR}` : "white"};
`;
const DetailKartImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;
const DetailNick = styled.div`
  width: 100%;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? `${OTHERS_BACKGROUND_COLOR}` : "white"};
`;
const DetailTime = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? `${OTHERS_BACKGROUND_COLOR}` : "white"};
`;

const MatchDetailContent = ({ matchData }) => {
  const { data, isLoading } = useGetMatchQuery(matchData.matchId);

  return isLoading ? (
    <SkeletonUI />
  ) : (
    <Details>
      <Detail>
        <DetailRank>#</DetailRank>
        <DetailKart>??????</DetailKart>
        <DetailNick>??????</DetailNick>
        <DetailTime>??????</DetailTime>
      </Detail>
      {data.players === undefined
        ? data.teams?.map((team) =>
            team?.players.map((member) => (
              <Detail
                key={member.accountNo}
                myAccountNo={matchData.accountNo}
                accountNo={member.accountNo}
              >
                <DetailRank
                  myAccountNo={matchData.accountNo}
                  accountNo={member.accountNo}
                  matchRank={member.matchRank}
                >
                  {RETIRE_STATUS_MATCH_RANKS.includes(member.matchRank)
                    ? "???????????? "
                    : member.matchRank}
                </DetailRank>
                <DetailKart
                  myAccountNo={matchData.accountNo}
                  accountNo={member.accountNo}
                >
                  <DetailKartImage
                    src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${member.kart}.png?v=1648453384`}
                    onError={(e) => {
                      e.target.src =
                        "https://tmi.nexon.com/img/assets/empty_kart.png";
                    }}
                  />
                </DetailKart>
                <DetailNick
                  myAccountNo={matchData.accountNo}
                  accountNo={member.accountNo}
                >
                  {member.characterName}
                </DetailNick>
                <DetailTime
                  myAccountNo={matchData.accountNo}
                  accountNo={member.accountNo}
                >
                  {convertRecord(member.matchTime)}
                </DetailTime>
              </Detail>
            ))
          )
        : data.players?.map((player) => (
            <Detail
              key={player.accountNo}
              myAccountNo={matchData.accountNo}
              accountNo={player.accountNo}
            >
              <DetailRank
                myAccountNo={matchData.accountNo}
                accountNo={player.accountNo}
                matchRank={player.matchRank}
              >
                {RETIRE_STATUS_MATCH_RANKS.includes(player.matchRank)
                  ? "???????????? "
                  : player.matchRank}
              </DetailRank>
              <DetailKart
                myAccountNo={matchData.accountNo}
                accountNo={player.accountNo}
              >
                <DetailKartImage
                  src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${player.kart}.png?v=1648453384`}
                  onError={(e) =>
                    (e.target.src =
                      "https://tmi.nexon.com/img/assets/empty_kart.png")
                  }
                />
              </DetailKart>
              <DetailNick
                myAccountNo={matchData.accountNo}
                accountNo={player.accountNo}
              >
                {player.characterName}
              </DetailNick>
              <DetailTime
                myAccountNo={matchData.accountNo}
                accountNo={player.accountNo}
              >
                {convertRecord(player.matchTime)}
              </DetailTime>
            </Detail>
          ))}
    </Details>
  );
};

export default MatchDetailContent;
