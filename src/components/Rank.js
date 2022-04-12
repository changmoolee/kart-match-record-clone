import React, { useRef, useState, useEffect } from "react";
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
const ChartBox = styled.div`
  width: 300px;
  height: 180px;
  padding: 12px;
`;
const Chart = styled.canvas`
  width: 300px;
  height: 180px;
`;

const Rank = ({ data }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  return (
    <Container>
      <Heading>
        <Title>
          <Blue>순위 변동</Blue> <Black>추이</Black>
        </Title>
        <Total>
          지난 200경기 &nbsp;<Blue>2.81위</Blue> &nbsp; 최근 50경기 &nbsp;
          <Blue>3.00위</Blue>
        </Total>
      </Heading>
      <ChartBox>
        <Chart ref={canvasRef}></Chart>
      </ChartBox>
    </Container>
  );
};

export default Rank;
