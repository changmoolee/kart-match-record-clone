import React from "react";
import styled from "styled-components";
import Left from "./Left";
import Right from "./Right";

const Container = styled.section`
  width: 100%;
  min-height: 800px;
  display: flex;
  margin-top: 20px;
`;

const Info = ({ data, isTeam, isRetire }) => {
  return (
    <Container>
      <Left data={data} />
      <Right data={data} isTeam={isTeam} isRetire={isRetire} />
    </Container>
  );
};

export default Info;
