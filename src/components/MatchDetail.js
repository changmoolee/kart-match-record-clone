import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import MatchDetailContent from "./MatchDetailContent";
import { convertTrackId, convertKart, convertRecord } from "./convert";

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

const MatchDetail = ({ matchData }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetail = () => {
    setDetailOpen((detailOpen) => !detailOpen);
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
        <Open rank={matchData.player.matchRank} onClick={() => handleDetail()}>
          <FontAwesomeIcon icon={faCaretDown} />
        </Open>
      </Match>
      {detailOpen ? (
        <MatchDetailContent matchData={matchData} />
      ) : // <Details>
      //   <Detail>
      //     <DetailRank>#</DetailRank>
      //     <DetailKart>카트</DetailKart>
      //     <DetailNick>유저</DetailNick>
      //     <DetailTime>기록</DetailTime>
      //   </Detail>
      //   {players.players === undefined
      //     ? players.teams?.map((team) =>
      //         team?.players.map((member) => (
      //           <Detail
      //             key={member.accountNo}
      //             myAccountNo={matchData.accountNo}
      //             accountNo={member.accountNo}
      //           >
      //             <DetailRank
      //               myAccountNo={matchData.accountNo}
      //               accountNo={member.accountNo}
      //               matchRank={member.matchRank}
      //             >
      //               {member.matchRank === "99" || member.matchRank === "0"
      //                 ? "리타이어 "
      //                 : member.matchRank}
      //             </DetailRank>
      //             <DetailKart
      //               myAccountNo={matchData.accountNo}
      //               accountNo={member.accountNo}
      //             >
      //               <DetailKartImage
      //                 src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${member.kart}.png?v=1648453384`}
      //                 onError={(e) => {
      //                   e.target.src =
      //                     "https://tmi.nexon.com/img/assets/empty_kart.png";
      //                 }}
      //               />
      //             </DetailKart>
      //             <DetailNick
      //               myAccountNo={matchData.accountNo}
      //               accountNo={member.accountNo}
      //             >
      //               {member.characterName}
      //             </DetailNick>
      //             <DetailTime
      //               myAccountNo={matchData.accountNo}
      //               accountNo={member.accountNo}
      //             >
      //               {convertRecord(member.matchTime)}
      //             </DetailTime>
      //           </Detail>
      //         ))
      //       )
      //     : players.players?.map((player) => (
      //         <Detail
      //           key={player.accountNo}
      //           myAccountNo={matchData.accountNo}
      //           accountNo={player.accountNo}
      //         >
      //           <DetailRank
      //             myAccountNo={matchData.accountNo}
      //             accountNo={player.accountNo}
      //             matchRank={player.matchRank}
      //           >
      //             {player.matchRank === "99" || player.matchRank === "0"
      //               ? "리타이어 "
      //               : player.matchRank}
      //           </DetailRank>
      //           <DetailKart
      //             myAccountNo={matchData.accountNo}
      //             accountNo={player.accountNo}
      //           >
      //             <DetailKartImage
      //               src={`https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/${player.kart}.png?v=1648453384`}
      //               onError={(e) =>
      //                 (e.target.src =
      //                   "https://tmi.nexon.com/img/assets/empty_kart.png")
      //               }
      //             />
      //           </DetailKart>
      //           <DetailNick
      //             myAccountNo={matchData.accountNo}
      //             accountNo={player.accountNo}
      //           >
      //             {player.characterName}
      //           </DetailNick>
      //           <DetailTime
      //             myAccountNo={matchData.accountNo}
      //             accountNo={player.accountNo}
      //           >
      //             {convertRecord(player.matchTime)}
      //           </DetailTime>
      //         </Detail>
      //       ))}
      // </Details>
      null}
    </MatchBox>
  );
};

export default MatchDetail;
