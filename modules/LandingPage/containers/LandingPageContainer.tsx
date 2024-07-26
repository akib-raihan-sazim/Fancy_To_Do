import React from "react";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FaTasks, FaRocket, FaChartLine } from "react-icons/fa";

import {
  LandingPageWrapper,
  Stars,
  Twinkling,
  Clouds,
  LandingContainer,
  LandingTitle,
  LandingText,
  FeatureList,
  GetStartedButton,
} from "./LandingPageContainer.styles";
import FeatureItem from "../components/FeatureItem";

const LandingPageContainer: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/Home");
  };

  return (
    <LandingPageWrapper>
      <Stars />
      <Twinkling />
      <Clouds />
      <LandingContainer>
        <Stack align="center">
          <LandingTitle>Welcome to Fancy To-Do App</LandingTitle>
          <LandingText>
            Organize your tasks efficiently with our user-friendly Todo App.
          </LandingText>
          <FeatureList>
            <Stack align="center">
              <FeatureItem
                icon={<FaTasks size={24} color="#228be6" />}
                text="Intuitive Task Management"
              />
              <FeatureItem
                icon={<FaRocket size={24} color="#40c057" />}
                text="Boost Your Productivity"
              />
              <FeatureItem
                icon={<FaChartLine size={24} color="#fab005" />}
                text="Track Your Progress"
              />
            </Stack>
          </FeatureList>
          <GetStartedButton onClick={handleGetStarted}>
            Get Started
          </GetStartedButton>
        </Stack>
      </LandingContainer>
    </LandingPageWrapper>
  );
};

export default LandingPageContainer;
