import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

const animation = keyframes`
  0% {
      background-position: 0 0%;
  }
  50% {
      background-position: 100% 0%;
  }
  100% {
      background-position: 0 0%;
  }
`;

const Container = styled.section`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  background: linear-gradient(-45deg, #ee7752, #f62459, #07f, #23d5ab);
  background-size: 400% 400%;
  box-sizing: border-box;

  animation: ${animation};
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Text = styled.span``;
const Button = styled.div`
  width: 82px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  font-size: 12px;
  font-weight: 400;
  border: 0.7px solid #fff;
  border-radius: 15px;
`;

const VSanimation = () => {
  return (
    <Container>
      <Text>1대1 매칭 시뮬레이터 - 'BBEESSTT' 와 가상 대결을 펼쳐보세요.</Text>
      <a
        href="https://tmi.nexon.com/simulator/BBEESSTT"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Button>
          <FontAwesomeIcon icon={faCalculator} />
          &nbsp;&nbsp;매칭하기
        </Button>
      </a>
    </Container>
  );
};

export default VSanimation;
