import withAuth from "@/components/withAuth";
import React from "react";
import Layout from "@/components/Layout/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  product?: string;
};

export const Edit = ({ product }: Props) => {
  return (
    <Layout>
      <div>Edit {product}</div>
    </Layout>
  );
};

export default withAuth(Edit);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  if (id) {
    const product = id; //await doGetStockById(id);
    return {
      props: {
        product,
      },
    };
  } else {
    return { props: {} };
  }
};
