import { captureUnderscoreErrorException } from "@sentry/nextjs";
import type { NextPage } from "next";
import ErrorPage from "next/error";
import type { ErrorProps } from "next/error";

const CustomErrorComponent: NextPage<ErrorProps> = ({ statusCode }) => (
  <ErrorPage statusCode={statusCode} />
);

CustomErrorComponent.getInitialProps = async (contextData) => {
  await captureUnderscoreErrorException(contextData);

  return ErrorPage.getInitialProps(contextData);
};

export default CustomErrorComponent;
