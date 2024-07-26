import React from "react";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FaTasks, FaRocket, FaChartLine } from "react-icons/fa";

import {
  LandingPageWrapper,
  Stars,
  Twinkling,
  Clouds,
  LandingTitle,
  LandingBox,
  LandingText,
  FeatureList,
  GetStartedButton,
} from "./LandingContainer.styles";
import FeatureItem from "../components/FeatureItem";

const LandingContainer: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/Login");
  };

  return (
    <LandingPageWrapper>
      <Stars />
      <Twinkling />
      <Clouds />
      <LandingBox>
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
      </LandingBox>
    </LandingPageWrapper>
  );
};

export default LandingContainer;
