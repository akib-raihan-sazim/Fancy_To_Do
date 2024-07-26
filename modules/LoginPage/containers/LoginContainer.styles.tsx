import styled, { keyframes } from "styled-components";

const moveCloudsBack = keyframes`
  from {background-position: 0 0;}
  to {background-position: 10000px 0;}
`;

const moveTwinkBack = keyframes`
  from {background-position: 0 0;}
  to {background-position: -10000px 5000px;}
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

export const Twinkling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: transparent
    url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat
    top center;
  animation: ${moveTwinkBack} 200s linear infinite;
`;

export const Clouds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: transparent
    url(http://www.script-tutorials.com/demos/360/images/clouds.png) repeat top
    center;
  animation: ${moveCloudsBack} 200s linear infinite;
`;

export const LoginPageWrapper = styled.div`
  min-height: 100vh;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: #000
    url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top
    center;
`;

export const FeatureList = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

export const LoginTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #7fa1de, #5b21a2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
