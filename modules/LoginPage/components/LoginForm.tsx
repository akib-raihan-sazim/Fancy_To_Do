import { useState } from "react";
import { TextInput, PasswordInput, Button, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

const VALID_EMAIL = "akib@bhai.com";
const VALID_PASSWORD = "123@";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onBack: () => void;
}

export function LoginForm({ onSubmit, onBack }: LoginFormProps) {
  const [error, setError] = useState("");

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
      onSubmit(values.email, values.password);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
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
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Sign in</Button>
      </Group>
      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}
    </form>
  );
}
