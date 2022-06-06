import Layout from "@/components/BackEnd/Layout/Layout";
import withAuth from "@/components/BackEnd/withAuth";
import { ADMIN_ACCESS_TOKEN_KEY } from "@/utils/constant";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import React, { useEffect, useState, useRef } from "react";
import { addNews } from "@/services/admin/adminService";
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
const { TextArea } = Input;
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
import { productImageURL, getBase64 } from "@/utils/commonUtil";
import { Editor } from "@tinymce/tinymce-react";

type Props = {};

const Add = ({}: Props) => {
  const router = useRouter();
  const [dateSend, setDateSend] = React.useState<Date>();
  const initialValues: any = {
    topic: "",
    post_date: "",
    status: "Show",
  };
  const editorRef = useRef<any>(null);

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
          <Title level={2}>Add News</Title>
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
            data.append("topic", String(values.topic));
            data.append("post_date", String(post_date));
            data.append("status", String(values.status));
            if (values.file) {
              data.append("thumbnail", values.file);
            }
            if (editorRef.current) {
              data.append("detail", editorRef.current.getContent());
            } else {
              data.append("detail", "");
            }
            const response = await addNews(data);
            if (response.status == "success") {
              Swal.fire("Success!", "Your news has been added", "success").then(
                function () {
                  router.push("/admin/news");
                }
              );
            }
            setSubmitting(false);
          }}
          validate={(values) => {
            let errors: any = {};
            if (!values.topic) {
              errors.topic = "* Topic is required";
            }
            if (!values.post_date) {
              errors.post_date = "* Post Date is required";
            }
            if (!values.file) {
              errors.thumbnail = "* Thumbnail is required";
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
                    <label>Topic *</label>
                    {/* <Input name={"room"} /> */}

                    <Input placeholder="Topic" name="topic" />
                    <p className="error__feedback" style={{ color: "red" }}>
                      {errors.topic ? `${errors.topic}` : ""}
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
                    className={`form__item ${
                      errors.thumbnail && "input__error"
                    } `}
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
                      name="thumbnail"
                      accept="image/*"
                      id="thumbnail"
                      required
                      style={{ padding: "20px 0 0 20px" }}
                    />

                    <p className="error__feedback" style={{ color: "red" }}>
                      {errors.thumbnail ? `${errors.thumbnail}` : ""}
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

                    <div
                      className={`form__item`}
                      style={{ width: "100%", marginTop: "20px" }}
                    >
                      <label>Detail *</label>
                      {/* <Input name={"room"} /> */}

                      <Editor
                        apiKey="2s0w71caf8mc5dpcr17pwapuu74ko8mkivvenvzdmvnqyjti"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue=""
                        init={{
                          height: 500,
                          menubar: true,
                          automatic_uploads: false,
                          file_picker_callback: function (cb, value, meta) {
                            var input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*, video/*");

                            input.onchange = async function (e: any) {
                              var file = e.target.files[0];
                              var formData;
                              formData = new FormData();
                              formData.append("file", file);
                              var urlupload =
                                process.env.NEXT_PUBLIC_BASE_URL_ADMIN_API;

                              const response: any = await axios.post(
                                `${urlupload}/tinyupload`,
                                formData
                              );
                              cb(
                                productImageURL(
                                  "tinyupload",
                                  response.data.location
                                ),
                                { alt: response.data.alt }
                              );
                            };
                            input.click();
                          },
                          plugins:
                            "link image textpattern lists table preview media",
                          toolbar:
                            " undo redo preview | formatselect | Link | image media | table | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
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
                      onClick={() => router.push("/admin/news")}
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
