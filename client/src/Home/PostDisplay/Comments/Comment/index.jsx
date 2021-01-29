import React from "react";
import Header from "./Header";
import Layout from "./Layout";
import Footer from "./Footer";
import Body from "./Body";

export default function Comment({ comment }) {
  return (
    <Layout>
      <Header comment={comment} />
      <Body comment={comment} />
      <Footer comment={comment} />
    </Layout>
  );
}
