import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 350px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  margin-right: 10px;
  background: white;
  box-sizing: border-box;
`;
const Heading = styled.header`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  color: #1f334a;
  box-sizing: border-box;
`;
const Title = styled.div``;
const Blue = styled.span`
  color: #2877ff;
`;
const Black = styled.span``;

const Total = styled.div`
  font-size: 12px;
  color: #1f334a;
  letter-spacing: -1px;
`;
const MessageBox = styled.section`
  width: 100%;
  height: 159px;
  padding: 0 5px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Message = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const NickName = styled.div`
  display: flex;
  height: 53px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 12px;
  white-space: nowrap;
  color: #07f;
`;

const ContensBox = styled.div`
  position: relative;
  width: 100%;
  height: 41px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 6px;
  font-size: 12px;
  border: 1px solid #c3ced5;
  border-radius: 15px;
  box-sizing: border-box;
`;
const Contents = styled.span`
  ::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    display: flex;
    align-items: center;
    margin-left: -14px;
    border-left: 1px solid #c3ced5;
    border-bottom: 1px solid #c3ced5;
    background: white;
    transform: rotate(0.125turn);
  }
  display: flex;
  align-items: center;
  margin: 0;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 8px;
  font-size: 14px;
  font-weight: 500;
  border-top: 1px solid #f2f2f2;
`;
const NickInput = styled.input`
  width: 15%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 2px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
`;
const MessageInput = styled.input`
  width: 60%;
  height: 30px;
  display: flex;
  justify-content: center;
  padding: 1px 2px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-weight: 500;
`;
const Button = styled.div`
  width: 53px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  background: #ccc;
  cursor: pointer;
`;
const data = [
  { name: "닉네임1", contents: "안녕하세요!" },
  { name: "닉네임2", contents: "반갑습니다." },
  { name: "닉네임3", contents: "좋은 경기 부탁드립니다." },
];

const Cheering = () => {
  const [messages, setMessages] = useState(data);
  const [nick, setNick] = useState("");
  const [contents, setContents] = useState("");

  const onChangeNick = (text) => {
    setNick(text);
  };
  const onChangeContents = (text) => {
    if (text.length <= 30) {
      setContents(text);
    } // 30자 제한
  };
  const addMessage = () => {
    let temp = { name: nick, contents: contents };

    if (nick !== "" && contents !== "") {
      // 닉네임과 내용이 빈 문자열이 아닐 때 작동.
      setMessages([...messages, temp]);
      setNick("");
      setContents("");
    } else {
      alert("닉네임 혹은 내용이 입력되지 않았습니다.");
    }
  };

  return (
    <Container>
      <Heading>
        <Title>
          <Blue>응원</Blue> <Black>한마디</Black>
        </Title>
        <Total>오늘 0개&nbsp; 전체 {messages.length}개</Total>
      </Heading>
      <MessageBox>
        {messages.map((message, index) => (
          <Message key={index}>
            <NickName>{message.name}</NickName>
            <ContensBox>
              <Contents>{message.contents}</Contents>
            </ContensBox>
          </Message>
        ))}
      </MessageBox>
      <Bottom>
        <NickInput
          placeholder="닉네임"
          value={nick}
          onChange={(e) => onChangeNick(e.target.value)}
        />
        <MessageInput
          placeholder="최대 30자"
          value={contents}
          onChange={(e) => onChangeContents(e.target.value)}
        />
        <Button onClick={addMessage}>남기기</Button>
      </Bottom>
    </Container>
  );
};

export default Cheering;
