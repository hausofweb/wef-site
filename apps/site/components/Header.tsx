import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

const Header: React.FunctionComponent<Props> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/wef_icon.png" />
  </Head>
);

export default Header;
