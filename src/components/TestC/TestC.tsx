"use client";

import { FC } from "react";
import { Text } from "../Text/Text";
import { Input } from "../Input/Input";

const TestC: FC = () => {
  return (
    <div>
      <h1>TestC</h1>
      <Text variant="h2" as="h5" color="red200">
        This is TestC component.
      </Text>
      <Input name="asd" label="asd" tooltip="sdf" />
    </div>
  );
};

export default TestC;
