import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
import Drawer from "./Drawer";
import Others from "./Others";

const Outer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Util = styled.div`
  width: 1000px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  color: #ccc;
`;
const Logo = styled.img`
  object-fit: contain;
  padding-left: 8px;
  box-sizing: border-box;
`;
const KartRiderLogo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background: #f2f2f2;
  }
`;
const IconContainer = styled.div`
  font-size: 12px;
  margin: 5px;
`;
const TMILogo = styled.div`
  cursor: pointer;
`;

const Homepage = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6c7a89;
  cursor: pointer;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = ({ searchData }) => {
  const [hovered, setHovered] = useState(null);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Nav의 "카트", "트랙" item을 hover할때 나타나는 Drawer의 state

  const handleOthers = () => {
    setIsOthersOpen((isOthersOpen) => !isOthersOpen);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  // Drawer on
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  // Drawer off
  const onMouseLeave = () => {
    closeDrawer();
  };
  // mouse가 떠났을 때 Drawer off하기

  return (
    <Outer>
      <Util>
        <Inner>
          <LogoContainer>
            <KartRiderLogo onClick={handleOthers}>
              <Logo src="https://tmi.nexon.com/img/assets/logo_kart.png" />
              <IconContainer>
                {isOthersOpen ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </IconContainer>
            </KartRiderLogo>
            {isOthersOpen ? <Others /> : null}
            <TMILogo>
              <Logo src="https://tmi.nexon.com/img/assets/tmi_logo_default_b.svg" />
            </TMILogo>
          </LogoContainer>
          <a
            href="https://kart.nexon.com/Main/Index.aspx"
            style={{ textDecoration: "none" }}
          >
            <Homepage>카트라이더 홈페이지 바로가기</Homepage>
          </a>
        </Inner>
      </Util>
      <Container onMouseLeave={onMouseLeave}>
        <Nav
          setHovered={setHovered}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          searchData={searchData}
        />
        {isDrawerOpen ? <Drawer hovered={hovered} /> : null}
      </Container>
    </Outer>
  );
};

export default Header;
