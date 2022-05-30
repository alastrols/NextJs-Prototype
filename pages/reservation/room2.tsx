import React, { useEffect, useState } from "react";
import Header from "@/components/FrontEnd/Header";
import Timeline from "react-calendar-timeline";
import interact from "interactjs";
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
const { Option } = Select;
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
//   TextField,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { FormikProps, Form, Field, Formik } from "formik";
// import { TextField } from "formik-material-ui";
// import Link from "next/link";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

// import { TimePicker, DatePicker, DateTimePicker } from "formik-material-ui-lab";

export const Room = () => {
  const [list, setList] = React.useState<any>([]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: "4a52f3faa5fb70acc2aab7af9213571b" }),
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch("https://itt-lic-2.com/api/meeting", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const item: any = [];
        data.data.forEach((element: any) => {
          var group = 0;
          if (element.room_name == "Meeting Room 1") {
            var group = 1;
          } else if (element.room_name == "Meeting Room 2") {
            var group = 2;
          }
          const split = element.meeting_date.split("-");
          const meeting_date = split[2] + "-" + split[1] + "-" + split[0];
          const from = meeting_date + " " + element.from_time;
          const to = meeting_date + " " + element.to_time;
          const start_time = new Date(from);
          const end_time = new Date(to);
          item.push({
            id: element.meeting_id,
            group: group,
            title: element.fullname,
            start_time: start_time.getTime(),
            end_time: end_time.getTime(),
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            itemProps: {
              "data-custom-attribute": "Random content",
              "aria-hidden": true,
              onDoubleClick: () => {
                Swal.fire(
                  `<span style="color:blue;">${element.fullname}</span> <br/> Date: ${element.meeting_date} <br/> From: ${element.from_time} <br/> To: ${element.to_time}`
                );
              },
            },
          });
        });

        setList(item);
      });
  };

  const groups = [
    { id: 1, title: "Meeting Room 1", height: 140 },
    { id: 2, title: "Meeting Room 2", height: 140 },
  ];

  const items = list;

  const initialValues: any = {
    room: 4,
    date: "",
    fromtime: "",
    totime: "",
  };

  const [dateSend, setDateSend] = React.useState("");
  const [fromTimeSend, setFromTimeSend] = React.useState("");
  const [toTimeSend, setToTimeSend] = React.useState("");

  const dateFormat = "DD-MM-YYYY";
  return (
    <div>
      <Header />
      <div>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
          lineHeight={50}
        />
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          const value_date = moment(dateSend).toDate();
          const value_fromtime = moment(fromTimeSend).toDate();
          const value_totime = moment(toTimeSend).toDate();
          const fromtime =
            value_fromtime.getHours() + ":" + value_totime.getMinutes();
          const totime =
            value_totime.getHours() + ":" + value_totime.getMinutes();

          const day = value_date.getDate();
          const month = value_date.getMonth() + 1;
          const year = value_date.getFullYear();
          const date = day + "-" + month + "-" + year;
          const from_date_time = date + " " + fromtime;
          const to_date_time = date + " " + totime;
          const ftime = new Date(from_date_time).getTime();
          const ttime = new Date(to_date_time).getTime();
          console.log(date);
          if (
            value_fromtime.getHours() >= value_totime.getHours() &&
            value_fromtime.getMinutes() >= value_totime.getMinutes()
          ) {
            Swal.fire(`Please check your time!`);
            return false;
          } else {
            console.log("success");
          }
          var room_name = "";
          if (values.room == 4) {
            var room_name = "Meeting Room 1";
          } else if (values.room == 5) {
            var room_name = "Meeting Room 2";
          }
          //   let data = new FormData();
          //   data.append("apikey", String("4a52f3faa5fb70acc2aab7af9213571b"));
          //   data.append("account_id", String(1));
          //   data.append("meeting_date", String(date));
          //   data.append("room_id", String(values.room));
          //   data.append("room_name", String(room_name));
          //   data.append("department_name", "Localization & Innovation Center");
          //   data.append("section_name", "Innovation Center");
          //   data.append("from_time", String(fromtime));
          //   data.append("to_time", String(totime));

          const send_data = await axios.post(
            `https://itt-lic-2.com/api/meeting/add`,
            {
              apikey: "4a52f3faa5fb70acc2aab7af9213571b",
              account_id: "1",
              meeting_date: String(date),
              room_id: String(values.room),
              room_name: String(room_name),
              department_name: "Localization & Innovation Center",
              section_name: "Innovation Center",
              from_time: String(fromtime),
              to_time: String(totime),
            }
          );

          console.log(send_data);

          getData();
          //   if (values.file) {
          //     data.append("image", values.file);
          //   }
          //   await addProduct(data);
          //   router.push("/stock");
          setSubmitting(false);
        }}
        validate={(values) => {
          let errors: any = {};
          if (!values.room) errors.room = "* Room is required";
          if (!values.date) errors.date = "* Reservation Date is required";
          if (!values.fromtime) errors.fromtime = "* Time is required";
          if (!values.totime) errors.totime = "* Time is required";
          // if (!values.age) errors.age = "Age is required";
          // if (values.age > 90) errors.age = "Are you sure you're human?";
          // if (!values.profession) errors.profession = "Profession is required";
          // if (/^[0-9]+$/.test(values.profession))
          //   errors.profession =
          //     "Profession does not require numbers or special characters";
          return errors;
        }}
      >
        {({ handleSubmit, errors }) => {
          return (
            <div className={"details__wrapper d-flex justify-content-center"}>
              <div className="row">
                <div
                  className={`form__item ${errors.room && "input__error"} `}
                  style={{ width: "100%" }}
                >
                  <label>Meeting Room *</label>
                  {/* <Input name={"room"} /> */}

                  <Select
                    name="room"
                    defaultValue="4"
                    style={{ width: "100%" }}
                  >
                    <Option value="4">Meeting Room 1</Option>
                    <Option value="5">Meeting Room 2</Option>
                  </Select>
                  <p className="error__feedback" style={{ color: "red" }}>
                    {errors.room ? `${errors.room}` : ""}
                  </p>
                </div>

                <div
                  className={`form__item ${errors.room && "input__error"} `}
                  style={{ width: "100%" }}
                >
                  <label>Reservation Date*</label>

                  <DatePicker
                    name="date"
                    style={{ width: "100%" }}
                    format={dateFormat}
                    onChange={(value: any) => setDateSend(value)}
                  />
                  <p className="error__feedback" style={{ color: "red" }}>
                    {errors.date ? `${errors.date}` : ""}
                  </p>
                </div>

                <div
                  className={`form__item ${errors.room && "input__error"} `}
                  style={{ width: "100%" }}
                >
                  <label>From Time*</label>

                  <TimePicker
                    name="fromtime"
                    style={{ width: "100%" }}
                    onChange={(value: any) => setFromTimeSend(value)}
                  />
                  <p className="error__feedback" style={{ color: "red" }}>
                    {errors.fromtime ? `${errors.fromtime}` : ""}
                  </p>
                </div>

                <div
                  className={`form__item ${errors.room && "input__error"} `}
                  style={{ width: "100%" }}
                >
                  <label>From Time*</label>

                  <TimePicker
                    name="totime"
                    style={{ width: "100%" }}
                    onChange={(value: any) => setToTimeSend(value)}
                  />
                  <p className="error__feedback" style={{ color: "red" }}>
                    {errors.totime ? `${errors.totime}` : ""}
                  </p>
                </div>

                <div className={"form__item button__items "}>
                  <Button type={"primary"} onClick={() => handleSubmit()}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Room;
