import React from "react";

import { Group, Text } from "@mantine/core";

const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <Group align="center">
    {icon}
    <Text>{text}</Text>
  </Group>
);

export default FeatureItem