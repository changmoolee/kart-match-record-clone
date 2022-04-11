import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes` 
    0% {
        background: rgba(165, 165, 165, 0.1);
    }

    50% {
      background: rgba(165, 165, 165, 0.3);
    }

    100% {
      background: rgba(165, 165, 165, 0.1);
    }
`;
const LoadingDetails = styled.section`
  width: 100%;
  height: 175px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;
const LoadingDetail = styled.div`
  width: 73px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const LoadingDetailRank = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
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
const SkeletonUI = () => {
  return (
    <LoadingDetails>
      {Array(9)
        .fill("")
        .map((_, index) => (
          <LoadingDetail key={index}>
            <LoadingDetailRank />
            <DetailKart />
            <DetailNick />
            <DetailTime />
          </LoadingDetail>
        ))}
    </LoadingDetails>
  );
};

export default SkeletonUI;
