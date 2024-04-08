import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@/components/ui";

const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-y-10 my-10 items-center justify-center">
      <div className="max-w-xl w-full flex flex-col gap-y-10">
        <Typography className="text-2xl font-bold">Test Cards</Typography>
        <Card>This is testing card 1</Card>
        <Card>
          <CardHeader>Card Header</CardHeader>
          <CardBody>Card Body</CardBody>
        </Card>
        <Card>
          <CardHeader>Card Header</CardHeader>
          <CardBody>Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestPage;
