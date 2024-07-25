import React from "react";
import {
  Button,
  Container,
  Title,
  Text,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { FaTasks, FaRocket, FaChartLine } from "react-icons/fa";

const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <Group align="center">
    {icon}
    <Text>{text}</Text>
  </Group>
);

const LandingPageContainer: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/HomePage");
  };

  return (
    <Box className="landing-page-wrapper">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <Container size="md" className="landing-page-container">
        <Stack align="center">
          <Title order={1} className="landing-title">
            Welcome to Fancy To-Do App
          </Title>

          <Text size="xl" className="landing-text">
            Organize your tasks efficiently with our user-friendly Todo App.
          </Text>

          <div className="feature-list">
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
          </div>

          <Button
            size="xl"
            fullWidth
            onClick={handleGetStarted}
            className="get-started-button"
          >
            Get Started
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingPageContainer;
