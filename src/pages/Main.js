import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/Profile";
import VSanimation from "../components/VSanimation";
import Stats from "../components/Stats";
import Taps from "../components/Tabs";
import Info from "../components/Info";

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
const ScrollToTop = styled.div`
  position: fixed;
  top: 80%;
  right: 0;
  bottom: 0;
  left: 90%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  background: #0277ff;
  cursor: pointer;
  z-index: 10;
`;

const reference_scroll_amount = 0;
// 스크롤양 0을 기준으로 합니다.
const reference_scrollY = 1000;
// 스크롤 수직 위치(window.scrollY) 1000을 기준으로 합니다.

const Main = ({ data, updateData }) => {
  const [isTeam, setIsTeam] = useState(false);
  // 개인전인지 팀전인지 여부
  const [isRetire, setIsRetire] = useState(false);
  // info/right 내 리타이어 정보들을 필터링 시킬 것인지 아닌지의 state
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const clickToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);
    document.addEventListener("mousewheel", (e) => {
      if (mounted) {
        if (
          e.deltaY < reference_scroll_amount &&
          window.scrollY > reference_scrollY
        ) {
          setShowScrollToTop(true);
        } // scrollY의 위치가 기준 아래로 내려왔음과 동시에 스크롤이 위로 올라가는게 감지될 떄 버튼 구현
        else {
          setShowScrollToTop(false);
        }
        // 스크롤이 아래로 내려가는게 감지될 시 버튼 소멸
        // scrollY의 위치가 상부에 머무를 시 버튼 소멸
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Outer>
      <Inner>
        {showScrollToTop ? (
          <ScrollToTop onClick={clickToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </ScrollToTop>
        ) : null}
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
        <Taps isRetire={isRetire} setIsRetire={setIsRetire} />
        <Info data={data} isTeam={isTeam} isRetire={isRetire} />
      </Inner>
    </Outer>
  );
};

export default Main;
