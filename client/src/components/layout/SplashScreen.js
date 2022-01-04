import React from 'react';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';

const Toggle = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.titleColor};
  color: ${(props) => props.theme.pageBackground};
  &:focus: {
    outline: none;
  }
  transition: all 0.5s ease;
`;

const Page = styled.div`
  background-color: ${(props) => props.theme.pageBackground};
  transition: all 0.5s ease;
`;

const Splash = (props) => {
  function changeTheme() {
    if (props.theme === 'light') {
      props.setTheme('dark');
    } else {
      props.setTheme('light');
    }
  }
  const icon =
    props.theme === 'light' ? <HiMoon size={40} /> : <CgSun size={40} />;
  return (
    <Page>
      <Toggle onClick={changeTheme}>{icon}</Toggle>
    </Page>
  );
};

export default Splash;
