import Head from "next/head";
import React, { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import Title from "./Title";

export type PageProps = {
  title: string;
};

export default function Page({ title, children }: PropsWithChildren<PageProps>) {
  const headTitle = `${title} - Next shop`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>
        <Title>{title}</Title>

        {children}
      </main>
    </>
  );
}
