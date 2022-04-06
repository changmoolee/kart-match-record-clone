import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Profile from "../components/Profile";
import VSanimation from "../components/VSanimation";
import Stats from "../components/Stats";
import Taps from "../components/Tabs";
import Info from "../components/Info";
import { throttle } from "lodash";

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

const Main = ({ data, updateData }) => {
  const [isTeam, setIsTeam] = useState(false);
  // 개인전인지 팀전인지 여부
  const [isRetire, setIsRetire] = useState(false);
  // info/right 내 리타이어 정보들을 노출시킬 것인지 아닌지의 state
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const clickToTop = () => {
    window.scrollTo(0, 0);
  };

  let prevScrollTop = 0;

  // document.addEventListener("scroll", () => {
  //   console.log({ scrollY: window.scrollY });
  //   let nextScrollTop = window.scrollY;
  //   if (nextScrollTop <= prevScrollTop) {
  //     console.log("up");
  //   } else if (nextScrollTop > prevScrollTop) {
  //     console.log("down");
  //   }
  //   prevScrollTop = nextScrollTop;
  // });

  document.addEventListener("mousewheel", (e) => {
    console.log(e.deltaY);
    const direction = e.deltaY > 0 ? "Scroll Down" : "Scroll Up";
    // 방향과 현 스크롤 위치
    if (e.deltaY < -30) {
      setShowScrollToTop(true);
    }
    if (parseInt(e.deltaY) < 10) {
      setTimeout(() => setShowScrollToTop(false), 2000);
    }
    console.log(direction, window.scrollY);
  });

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
