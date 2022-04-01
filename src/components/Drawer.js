import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 55px;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  background: #7cabe2;
  z-index: 2;
`;
const SubContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`;
const Items = styled.section`
  display: flex;
  align-items: center;
`;
const Item = styled.div`
  width: 80px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const Drawer = ({ hovered }) => {
  const items = Array(hovered)
    .fill("")
    .concat(["⋅\u00A0\u00A0스피드 개인전", "⋅\u00A0\u00A0스피드 팀전"]);
  return (
    <Container>
      <SubContainer>
        <Items>
          {items.map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </Items>
      </SubContainer>
    </Container>
  );
};

export default Drawer;
