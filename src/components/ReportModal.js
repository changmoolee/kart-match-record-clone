import React, { useState } from "react";
import styled from "styled-components";
import AlertModal from "./AlertModal";

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
  z-index: 10;
`;

const Container = styled.div`
  position: fixed;
  width: 300px;
  padding: 25px;
  background: white;
  z-index: 11;
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
const Textarea = styled.textarea`
  height: 100px;
  padding: 0 10px;
  margin-top: 20px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
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
const ReportModal = ({ closereport }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const openAlert = () => {
    setIsAlertOpen(true);
  };
  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const onChange = (text) => {
    setDesc(text);
  };

  const alert = () => {
    if (desc === "") {
      openAlert();
    } else {
      closereport();
    }
  };

  return (
    <Dim>
      {isAlertOpen ? <AlertModal closeAlert={closeAlert} /> : null}
      <Container>
        <SubContainer>
          <Title>유저신고</Title>
          <Desc>해당 유저를 신고하겠습니까?</Desc>
          <Desc>신고하시려면 사유를 입력해 주세요.</Desc>
          <Textarea value={desc} onChange={(e) => onChange(e.target.value)} />
          <Buttons>
            <Button onClick={closereport}>아니오</Button>
            <Button onClick={alert}>네</Button>
          </Buttons>
        </SubContainer>
      </Container>
    </Dim>
  );
};

export default ReportModal;
