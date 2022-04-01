import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/Profile";
import VSanimation from "../components/VSanimation";
import Stats from "../components/Stats";

const Outer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.025);
`;
const Inner = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
`;
const ApiInfo = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #1f334a;
  letter-spacing: -1px;
`;
const IconContainer = styled.div`
  font-size: 13px;
  margin-right: 5px;
`;

const Main = ({ data, updateData }) => {
  const [isTeam, setIsTeam] = useState(false);
  // 개인전인지 팀전인지 여부
  const [isRetire, setIsRetire] = useState(false);
  // info/right 내 리타이어 정보들을 노출시킬 것인지 아닌지의 state

  return (
    <Outer>
      <Inner>
        <ApiInfo>
          <IconContainer>
            <FontAwesomeIcon icon={faCircleInfo} />
          </IconContainer>
          카트라이더 매치데이터는 최근 1년치 데이터만 확인할 수 있습니다
        </ApiInfo>
        <Profile
          data={data}
          updateData={updateData}
          isTeam={isTeam}
          setIsTeam={setIsTeam}
        />
        <VSanimation />
        <Stats data={data} />
      </Inner>
    </Outer>
  );
};

export default Main;
