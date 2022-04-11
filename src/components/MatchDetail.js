import React, { useState } from "react";
import styled from "styled-components";
import { useGetPlayerDatasMutation } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import { convertTrackId, convertKart, convertRecord } from "./convert";
import SkeletonUI from "./SkeletonUI";

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
    rank === "" || rank === "99"
      ? "4px solid #f62459"
      : rank === "1"
      ? "4px solid #07f"
      : "4px solid #8893a2"};
  color: "#1f334a";
  background: ${({ rank }) =>
    rank === "" || rank === "99"
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
    rank === "" || rank === "99"
      ? "#f62459"
      : rank === "1"
      ? "#07f"
      : "#1f334a"};
  opacity: ${({ rank }) =>
    rank === "" || rank === "99" ? "1" : rank === "1" ? "1" : "0.5"};
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
      rank === "" || rank === "99"
        ? "#f62459"
        : rank === "1"
        ? "#07f"
        : "#1f334a"};
  }
`;

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
    matchRank === "99" || matchRank === "0"
      ? "red"
      : matchRank === "1"
      ? "#0277ff"
      : "black"};
  background: ${({ myAccountNo, accountNo, matchRank }) =>
    (matchRank === "1") & (myAccountNo === accountNo) ? "#e5ecf6" : "#f2f2f2"};
`;

const DetailKart = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? "#f2f2f2" : "white"};
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
    myAccountNo === accountNo ? "#f2f2f2" : "white"};
`;
const DetailTime = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ myAccountNo, accountNo }) =>
    myAccountNo === accountNo ? "#f2f2f2" : "white"};
`;

const MatchDetail = ({ matchData }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [players, setPlayers] = useState({});

  const [getPlayerDatas, result] = useGetPlayerDatasMutation();
  const { isError, isLoading, isSuccess } = result;
  // 어떻게 쓸지 모르겠음 과연 아래의 방식이 맞을까?
  const getPlayerData = async (matchId) => {
    let datas = await getPlayerDatas(matchId);
    setPlayers(datas.data);
  };

  const handleDetail = (matchId) => {
    setDetailOpen((detailOpen) => !detailOpen);
    getPlayerData(matchId);
  };

  return matchData === null ? null : (
    <MatchBox>
      <Match rank={matchData.player.matchRank}>
        <Type>
          {formatDistanceToNow(new Date(matchData.endTime), { locale: ko }) +
            " 전"}
        </Type>
        <Result rank={matchData.player.matchRank}>
          {matchData.player.matchRank === "" ||
          matchData.player.matchRank === "99" ? (
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
        <Open
          rank={matchData.player.matchRank}
          onClick={() => handleDetail(matchData.matchId)}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </Open>
      </Match>
      {detailOpen ? (
        isLoading ? (
          <SkeletonUI />
        ) : (
          <Details>
            <Detail>
              <DetailRank>#</DetailRank>
              <DetailKart>카트</DetailKart>
              <DetailNick>유저</DetailNick>
              <DetailTime>기록</DetailTime>
            </Detail>
            {players.players === undefined
              ? players.teams?.map((team) =>
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
                        {member.matchRank === "99" || member.matchRank === "0"
                          ? "리타이어 "
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
              : players.players?.map((player) => (
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
                      {player.matchRank === "99" || player.matchRank === "0"
                        ? "리타이어 "
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
        )
      ) : null}
    </MatchBox>
  );
};

export default MatchDetail;
