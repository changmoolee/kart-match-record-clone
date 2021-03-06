import React from "react";
import styled from "styled-components";

const Container = styled.div`
  top: 48px;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: white;
  z-index: 3;
`;
const OthersHeading = styled.div`
  height: 31px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #07f;
  cursor: pointer;
`;
const OthersGame = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 2px 10px;
  margin-bottom: 5px;
`;
const KartRider = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: -1px;
  color: black;
  cursor: pointer;
  :hover {
    background: #f2f2f2;
  }
`;
const GameImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin-right: 5px;
`;

const Others = () => {
  return (
    <Container>
      <OthersHeading>
        <img src="https://tmi.nexon.com/img/assets/icon_tmi.png" alt="TMI" />
        &nbsp;에서 다른 게임을 보고 싶다면?
      </OthersHeading>
      <OthersGame>
        <KartRider href="https://kart.nexon.com/Main/Index.aspx">
          <GameImage
            src="https://rs.nxfs.nexon.com/gameusr/19/3/uZCK25141939117.png"
            alt="kartRider"
          />
          카트라이더
        </KartRider>
      </OthersGame>
    </Container>
  );
};

export default Others;
