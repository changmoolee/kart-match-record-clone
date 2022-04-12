import React from "react";
import styled from "styled-components";

const Dim = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 12;
`;

const Container = styled.div`
  position: fixed;
  width: 300px;
  padding: 25px;
  background: white;
  z-index: 13;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: 700;
  color: #1f334a;
`;
const Desc = styled.div`
  font-size: 14px;
  color: #1f334a;
`;
const Buttons = styled.section`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
`;
const Button = styled.div`
  width: 50px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background-color: #07f;
  cursor: pointer;
`;

const AlertModal = ({ closeAlert }) => {
  return (
    <Dim>
      <Container>
        <SubContainer>
          <Title>확인</Title>
          <Desc>신고 사유를 입력해 주세요.</Desc>
          <Buttons>
            <Button onClick={closeAlert}>네</Button>
          </Buttons>
        </SubContainer>
      </Container>
    </Dim>
  );
};

export default AlertModal;
