import { useRouter } from "next/router";
import { Paper, Title, Container } from "@mantine/core";

import { LoginForm } from "../components/LoginForm";
import {
  Clouds,
  FeatureList,
  LoginPageWrapper,
  LoginTitle,
  Stars,
  Twinkling,
} from "./LoginContainer.styles";

export default function LoginPageContainer() {
  const router = useRouter();

  const handleSubmit = (email: string, password: string) => {
    router.push("/Home");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <LoginPageWrapper>
      <Stars />
      <Twinkling />
      <Clouds />
      <Container size={420} my={40}>
        <FeatureList>
          <LoginTitle>Welcome back!</LoginTitle>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <LoginForm onSubmit={handleSubmit} onBack={handleBack} />
          </Paper>
        </FeatureList>
      </Container>
    </LoginPageWrapper>
  );
}
