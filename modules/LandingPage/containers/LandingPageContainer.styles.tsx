import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInDown = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const moveTwinkBack = keyframes`
  from {background-position: 0 0;}
  to {background-position: -10000px 5000px;}
`;

const moveCloudsBack = keyframes`
  from {background-position: 0 0;}
  to {background-position: 10000px 0;}
`;

const alphabetAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
`;

export const LandingPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: #000
    url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top
    center;
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

export const LandingContainer = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

export const LandingTitle = styled.h1`
  animation: ${slideInDown} 0.5s ease-out;
`;

export const LandingText = styled.p`
  animation: ${slideInUp} 0.5s ease-out 0.2s both;
`;

export const FeatureList = styled.div`
  animation: ${scaleIn} 0.5s ease-out 0.4s both;
`;

export const GetStartedButton = styled.button`
  width: 100%;
  background-color: #03346e;
  border: none;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  animation: ${slideInUp} 0.5s ease-out 0.6s both;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
