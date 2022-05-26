import withAuth from "@/components/withAuth";
import React from "react";
import Layout from "@/components/Layout/Layout";

type Props = {};

export const Report = ({}: Props) => {
  return (
    <Layout>
      <div>Report</div>
    </Layout>
  );
};

export default withAuth(Report);
