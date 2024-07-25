import { useState } from "react";
import { useRouter } from "next/router";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const VALID_EMAIL = "akib@bhai.com";
const VALID_PASSWORD = "123@";

export default function LoginPageContainer() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (values.email === VALID_EMAIL && values.password === VALID_PASSWORD) {
      router.push("/HomePage");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="loginWrapper">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <Container size={420} my={40}>
        <div className="feature-list">
          <Title className="title-login">Welcome back!</Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps("password")}
              />
              <Group mt="xl">
              <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit">Sign in</Button>
              </Group>
            </form>
            {error && (
              <Text size="sm" mt="sm">
                {error}
              </Text>
            )}
          </Paper>
        </div>
      </Container>
    </div>
  );
}
