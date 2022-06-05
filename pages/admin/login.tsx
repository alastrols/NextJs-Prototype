import React from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { TextField } from "formik-material-ui";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { purple, red } from "@mui/material/colors";
import { login } from "@/store/slices/admin/adminSlice";
import { useAppDispatch } from "@/store/store";

type Props = {};

const Login = ({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    marginTop: 5,
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const showForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="username"
          id="username"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          name="password"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
        <CancelButton
          fullWidth
          variant="contained"
          onClick={() => router.push("/admin/register")}
        >
          Register
        </CancelButton>
      </Form>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200 }}
          image="/static/img/next_login.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values) => {
              const response = await dispatch(login(values));
              if (response.meta.requestStatus === "rejected") {
                alert("Login Failed!");
              } else {
                router.push("/admin/banner");
              }
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>

      {/* <style jsx global>
        {`
          body {
            min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url("/static/img/bg4.jpg");
            text-align: center;
          }
        `}
      </style> */}
    </Box>
  );
};

export default Login;
