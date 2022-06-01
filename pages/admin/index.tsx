import React from "react";
import withAuth from "@/components/BackEnd/withAuth";
import Layout from "@/components/BackEnd/Layout/Layout";
type Props = {};

export const Index = ({}: Props) => {
  return (
    <Layout>
      <div>
        <p>Admin Index</p>
      </div>
    </Layout>
  );
};

export default withAuth(Index);
