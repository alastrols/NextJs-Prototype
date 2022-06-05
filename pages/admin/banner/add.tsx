import Layout from "@/components/BackEnd/Layout/Layout";
import withAuth from "@/components/BackEnd/withAuth";
import { ADMIN_ACCESS_TOKEN_KEY } from "@/utils/constant";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import React, { useEffect, useState } from "react";
import { addBanner } from "@/services/admin/adminService";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Field,
  SubmitButton,
  ResetButton,
  Select,
  DatePicker,
  TimePicker,
} from "formik-antd";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FieldArray,
  Formik,
  FormikProps,
  FormikErrors,
  FormikValues,
} from "formik";
import { Button, Card, Typography } from "antd";
import Image from "next/image";
const { Title } = Typography;
const { Option } = Select;
import { useRouter } from "next/router";

type Props = {};

const Add = ({}: Props) => {
  const router = useRouter();
  const [dateSend, setDateSend] = React.useState("");
  const initialValues: any = {
    banner_name: "",
    post_date: "",
    status: "Show",
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={values.file_obj}
          width={100}
          height={100}
        />
      );
    }
  };
  const dateFormat = "YYYY-MM-DD";
  return (
    <Layout>
      <div>
        <div className={"details__wrapper d-flex justify-content-center mt-4"}>
          <Title level={2}>Add Banner</Title>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            const value_date = moment(dateSend).toDate();
            const day = value_date.getDate();
            const month = value_date.getMonth() + 1;
            const year = value_date.getFullYear();
            const post_date = year + "-" + month + "-" + day;

            let data = new FormData();
            data.append("banner_name", String(values.banner_name));
            data.append("post_date", String(post_date));
            data.append("status", String(values.status));
            if (values.file) {
              data.append("banner", values.file);
            }

            const response = await addBanner(data);
            if (response.status == "success") {
              Swal.fire(
                "Success!",
                "Your reservation has been added",
                "success"
              ).then(function () {
                router.push("/admin/banner");
              });
            }
            setSubmitting(false);
          }}
          validate={(values) => {
            let errors: any = {};
            if (!values.banner_name) {
              errors.banner_name = "* Banner Name is required";
            }
            if (!values.post_date) {
              errors.post_date = "* Post Date is required";
            }
            if (!values.file) {
              errors.banner = "* Banner is required";
            }
            return errors;
          }}
        >
          {({ values, handleSubmit, setFieldValue, errors }) => {
            return (
              <div className={"details__wrapper d-flex justify-content-center"}>
                <div className="row">
                  <div
                    className={`form__item ${errors.room && "input__error"} `}
                    style={{ width: "100%" }}
                  >
                    <label>Banner Name *</label>
                    {/* <Input name={"room"} /> */}

                    <Input placeholder="Banner Name" name="banner_name" />
                    <p className="error__feedback" style={{ color: "red" }}>
                      {errors.banner_name ? `${errors.banner_name}` : ""}
                    </p>
                  </div>

                  <div
                    className={`form__item ${
                      errors.post_date && "input__error"
                    } `}
                    style={{ width: "100%" }}
                  >
                    <label>Post Date*</label>

                    <DatePicker
                      name="post_date"
                      style={{ width: "100%" }}
                      format={dateFormat}
                      onChange={(value: any) => setDateSend(value)}
                    />
                    <p className="error__feedback" style={{ color: "red" }}>
                      {errors.post_date ? `${errors.post_date}` : ""}
                    </p>
                  </div>

                  <div
                    className={`form__item ${errors.banner && "input__error"} `}
                    style={{ width: "100%" }}
                  >
                    <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>
                    <Image
                      objectFit="cover"
                      alt="product image"
                      src="/static/img/ic_photo.png"
                      width={25}
                      height={20}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      Add Picture
                    </span>

                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<any>) => {
                        e.preventDefault();
                        setFieldValue("file", e.target.files[0]); // for upload
                        setFieldValue(
                          "file_obj",
                          URL.createObjectURL(e.target.files[0])
                        ); // for preview image
                      }}
                      name="banner"
                      accept="image/*"
                      id="banner"
                      required
                      style={{ padding: "20px 0 0 20px" }}
                    />

                    <p className="error__feedback" style={{ color: "red" }}>
                      {errors.banner ? `${errors.banner}` : ""}
                    </p>
                  </div>

                  <div className={"form__item button__items "}>
                    <div
                      className={`form__item ${
                        errors.status && "input__error"
                      } `}
                      style={{ width: "100%" }}
                    >
                      <label>Status</label>
                      {/* <Input name={"room"} /> */}

                      <Select
                        name="status"
                        defaultValue="Show"
                        style={{ width: "100%" }}
                      >
                        <Option value="Show">Show</Option>
                        <Option value="Hide">Hide</Option>
                      </Select>
                    </div>

                    <Button
                      style={{ marginTop: "20px" }}
                      type={"primary"}
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                    <Button
                      style={{ marginTop: "20px", marginLeft: "20px" }}
                      type={"primary"}
                      danger
                      onClick={() => router.push("/admin/banner")}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default withAuth(Add);
