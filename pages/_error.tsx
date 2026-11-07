import { captureUnderscoreErrorException } from "@sentry/nextjs";
import type { NextPage } from "next";
import Error, { ErrorProps } from "next/error";

const CustomErrorComponent: NextPage<ErrorProps> = (props) => (
	<Error statusCode={props.statusCode} />
);

CustomErrorComponent.getInitialProps = async (contextData) => {
	await captureUnderscoreErrorException(contextData);
	return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
