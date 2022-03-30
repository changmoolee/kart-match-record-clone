import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 82px;
  display: flex;
  justify-content: center;
  background: #fafafa;
`;
const SubContainer = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
`;
const Inner = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Logos = styled.div`
  height: 46px;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 140px;
  margin-right: 10px;
  opacity: 0.3;
`;
const Desc = styled.span`
  width: 250px;
  padding-left: 10px;
  border-left: 1px solid #ccc;
  font-size: 12px;
  font-family: Noto Sans KR;
  letter-spacing: -1px;
  color: #a1a1a1;
`;

const Items = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
`;

const Item = styled.span`
  margin-top: 10px;
  padding-right: 10px;
  margin-right: 10px;
  color: #a1a1a1;
  font-size: 12px;
  letter-spacing: -1px;
  cursor: pointer;
`;

const Footer = () => {
  const items = ["About TMI", "문의/피드백", "업데이트로그", "채용"];

  return (
    <Container>
      <SubContainer>
        <Inner>
          <Logos>
            <Img src="https://tmi.nexon.com/img/assets/lab_logo.svg" />
            <Desc>Data based on NEXON DEVELOPERS</Desc>
          </Logos>
          <Items>
            {items.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
          </Items>
        </Inner>
      </SubContainer>
    </Container>
  );
};

export default Footer;
