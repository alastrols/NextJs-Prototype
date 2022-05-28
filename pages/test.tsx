import { doGetStockById } from "@/services/serverService";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";


export const Test = ({ product }: any) => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id: string = "14";
  const product = await axios.get("https://www.mecallapi.com/api/users");
  console.log(product);
  return {
    props: {
      product: product.data,
    },
  };
};

export default Test;
