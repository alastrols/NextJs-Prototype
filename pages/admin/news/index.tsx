import Layout from "@/components/BackEnd/Layout/Layout";
import withAuth from "@/components/BackEnd/withAuth";
import React, { useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import {
//   getBanner,
//   deleteProduct,
//   deleteAllProduct,
//   productSelector,
// } from "@/store/slices/productSlice";
import {
  getNews,
  newsSelector,
  deleteNews,
  deleteAllNews,
  sortableNews,
} from "@/store/slices/admin/newsSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { NewsData } from "@/models/news.model";
import Image from "next/image";
import { productImageURL, getBase64 } from "@/utils/commonUtil";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import router from "next/router";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { Button, Fab, Card, CardContent, CardActions } from "@mui/material";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import axios, { AxiosResponse } from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "@mui/material/Modal";
import { Field, Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { TextField as TextFieldInput } from "formik-material-ui";
import TextField from "@mui/material/TextField";
import { addNews } from "@/services/admin/adminService";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Editor } from "@tinymce/tinymce-react";
import { getNewsId, editNews } from "@/services/admin/adminService";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof NewsData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  valSelected: any;
}

// type Props = {};
type Props = {};

interface HeadCell {
  disablePadding: boolean;
  id: keyof NewsData;
  label: string;
  numeric: boolean;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  overflow: "scroll",
  height: "100%",
  display: "block",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const News = ({}: Props) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof NewsData>("arr");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ids, setIds] = React.useState<Array<number>>([]);
  const [searched, setSearched] = React.useState<string>("");
  const [sorted, setSorted] = React.useState<Array<string>>([]);
  // const [dateSend, setDateSend] = React.useState<Date | null>(null);
  const [dateSend, setDateSend] = React.useState<Date>(new Date());
  const [addStatus, setAddStatus] = React.useState("Show");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const editorRef = useRef<any>(null);
  const editorEditRef = useRef<any>(null);
  const [topicEdit, setTopicEdit] = React.useState("");
  const [dateSendEdit, setDateSendEdit] = React.useState<Date>(new Date());
  const [addStatusEdit, setAddStatusEdit] = React.useState("Show");
  const [editNewsId, setEditNewsId] = React.useState<string>();
  const [editThumbmail, setEditThumbmail] = React.useState("");

  const newsList = useSelector(newsSelector);
  // const [rows, setRows] = React.useState(productList ?? []);
  const rows = newsList ?? [];

  // const rows = productList ?? [];
  const dispatch = useAppDispatch();

  const requestSearch = (searchedVal: string) => {
    console.log(searchedVal);
  };

  const DeleteAll = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteAllNews(id));
            setSelected([]);
            dispatch(getNews());
          }
        );
      }
    });
  };

  const Delete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteNews(id));
            setSelected([]);
          }
        );
      }
    });
  };

  // Drag and Drop
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    let movedItems: any = reorder(
      rows,
      result.source.index,
      result.destination.index
    );
    dispatch(sortableNews(movedItems));
    setSorted(movedItems);
  };

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  // Drag and Drop

  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, valSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            News
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => DeleteAll(valSelected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton></IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NewsData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: any = rows.map((n) => n.news_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getNews(searched));
  }, [dispatch, searched]);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch, sorted]);

  async function saveAsExcel() {
    const wb = new Excel.Workbook();

    const ws = wb.addWorksheet();

    ws.columns = [
      { width: 5 },
      { width: 20 },
      { width: 18 },
      { width: 10 },
      { width: 10 },
      { width: 20 },
    ];
    const row: any = ws.addRow([
      "No",
      "Topic",
      "Thumbnail",
      "Post Date",
      "Status",
      "CreatedAt",
    ]);
    row.font = {
      bold: true,
    };

    let position: number = 2;

    await Promise.all(
      rows.map(async (item, index): Promise<any> => {
        const no = index + 1;
        const content = ws.addRow([
          no,
          item.topic,
          "",
          item.post_date,
          item.status,
          item.created_at,
        ]);
        content.height = 100;
        if (item.thumbnail != "") {
          const url = productImageURL("news", item.thumbnail);
          let axiosResponse: any = await axios.get<
            any,
            AxiosResponse<ArrayBuffer>
          >(url, {
            responseType: "arraybuffer",
          });

          const dataBuffer = Buffer.from(axiosResponse.data, "binary").toString(
            "base64"
          );
          var imageID = wb.addImage({
            base64: dataBuffer,
            extension: "png",
          });
          ws.addImage(imageID, `C${no + 1}:C${no + 1}`);
        }

        position++;
      })
    );
    ws.eachRow(function (row, rowNumber) {
      row.alignment = { vertical: "middle", horizontal: "center" };
    });
    const buf = await wb.xlsx.writeBuffer();
    await saveAs(new Blob([buf]), "news.xlsx");
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "news_id",
      numeric: false,
      disablePadding: false,
      label: "No",
    },
    {
      id: "topic",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "thumbnail",
      numeric: false,
      disablePadding: false,
      label: "Thumbnail",
    },
    {
      id: "post_date",
      numeric: true,
      disablePadding: false,
      label: "Post Date",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "created_at",
      numeric: true,
      disablePadding: false,
      label: "Created At",
    },
  ];

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof NewsData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "center"}
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              {headCell.label}
            </TableCell>
          ))}
          <TableCell align="center" padding="normal">
            Action
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  const showForm = ({ values, setFieldValue, isValid }: FormikProps<any>) => {
    setEditThumbmail("");
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Add News
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextFieldInput}
              name="topic"
              type="text"
              label="Topic"
            />
            <br />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Post Date"
                mask="____-__-__"
                value={dateSend}
                onChange={(newValue: any) => {
                  if (newValue instanceof Date && !isNaN(newValue.valueOf())) {
                    setDateSend(newValue);
                  }
                }}
                inputFormat="yyyy-MM-dd"
                renderInput={(params: any) => (
                  <TextField
                    name="post_date"
                    fullWidth
                    style={{ marginTop: 16, marginBottom: 16 }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>

            <Editor
              apiKey="2s0w71caf8mc5dpcr17pwapuu74ko8mkivvenvzdmvnqyjti"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              init={{
                height: 600,
                menubar: true,
                dialog_type: "modal",
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
                    var urlupload = process.env.NEXT_PUBLIC_BASE_URL_ADMIN_API;

                    const response: any = await axios.post(
                      `${urlupload}/tinyupload`,
                      formData
                    );
                    cb(productImageURL("tinyupload", response.data.location), {
                      alt: response.data.alt,
                    });
                  };
                  input.click();
                },
                plugins: "link image textpattern lists table preview media",
                toolbar:
                  " undo redo preview | formatselect | Link | image media | table | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <br />
            <Field
              name="status"
              style={{ marginTop: 16 }}
              render={(field: any) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    onChange={(e: any) => {
                      setAddStatus(e.target.value);
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    fullWidth
                    value={addStatus}
                  >
                    <MenuItem value="Show">Show</MenuItem>
                    <MenuItem value="Hide">Hide</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
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
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Add
            </Button>

            <Button variant="outlined" fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const getEditData = async (id: any) => {
    const news = async (): Promise<any> => {
      return await getNewsId(id);
    };
    news().then((value) => {
      setTopicEdit(value?.topic);
      setDateSendEdit(value?.post_date);
      setAddStatusEdit(value?.status);
      setEditNewsId(value?.news_id);
      setEditThumbmail(value?.thumbnail);
      editorEditRef.current = value?.detail;
      setSelected([]);
      handleOpenEdit();
    });

    // console.log(news.topic);
  };

  const showFormEdit = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Edit News
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextFieldInput}
              name="topic"
              type="text"
              label="Topic"
            />
            <br />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Post Date"
                mask="____-__-__"
                value={dateSendEdit}
                onChange={(newValue: any) => {
                  if (newValue instanceof Date && !isNaN(newValue.valueOf())) {
                    setDateSend(newValue);
                  }
                }}
                inputFormat="yyyy-MM-dd"
                renderInput={(params: any) => (
                  <TextField
                    name="post_date"
                    fullWidth
                    style={{ marginTop: 16, marginBottom: 16 }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>

            <Editor
              apiKey="2s0w71caf8mc5dpcr17pwapuu74ko8mkivvenvzdmvnqyjti"
              onInit={(evt, editor) => (editorEditRef.current = editor)}
              initialValue={editorEditRef.current}
              init={{
                height: 600,
                menubar: true,
                dialog_type: "modal",
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
                    var urlupload = process.env.NEXT_PUBLIC_BASE_URL_ADMIN_API;

                    const response: any = await axios.post(
                      `${urlupload}/tinyupload`,
                      formData
                    );
                    cb(productImageURL("tinyupload", response.data.location), {
                      alt: response.data.alt,
                    });
                  };
                  input.click();
                },
                plugins: "link image textpattern lists table preview media",
                toolbar:
                  " undo redo preview | formatselect | Link | image media | table | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <br />
            <Field
              name="status"
              style={{ marginTop: 16 }}
              value={addStatusEdit}
              render={(field: any) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    onChange={(e: any) => {
                      setAddStatusEdit(e.target.value);
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    value={addStatusEdit}
                    fullWidth
                  >
                    <MenuItem value="Show">Show</MenuItem>
                    <MenuItem value="Hide">Hide</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
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
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Add
            </Button>

            <Button variant="outlined" fullWidth onClick={handleCloseEdit}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="thumbnail image"
          src={values.file_obj}
          width={100}
          height={100}
        />
      );
    } else if (editThumbmail) {
      return (
        <Image
          objectFit="contain"
          alt="thumbnail image"
          src={productImageURL("news", editThumbmail)}
          width={100}
          height={100}
        />
      );
    }
  };

  const initialValues: any = {
    topic: "",
    status: "Show",
    post_date: new Date(),
  };

  const initialValuesEdit: any = {
    topic: topicEdit,
    status: "Show",
    post_date: new Date(),
  };

  return (
    <Layout>
      <TextField
        fullWidth
        value={searched}
        label="Search..."
        onChange={(e: React.ChangeEvent<any>) => {
          e.preventDefault();
          console.log(e.target.value);
          setSearched(e.target.value);
        }}
      />

      <Box sx={{ width: "100%", mt: 2 }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            valSelected={selected}
          />

          <Button
            sx={{ ml: 2 }}
            onClick={handleOpen}
            variant="contained"
            color="primary"
          >
            Add News
          </Button>

          {/* <Button
            sx={{ ml: 2 }}
            onClick={() => router.push("/admin/news/add")}
            variant="contained"
            color="primary"
          >
            Add News
          </Button> */}

          <Button
            sx={{ ml: 2, flexGrow: 1 }}
            onClick={saveAsExcel}
            variant="contained"
            color="success"
          >
            Export to Excel
          </Button>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <DragDropContext onDragEnd={onDragEnd} key={0}>
                <Droppable droppableId="droppable" key={0}>
                  {(provided, snapshot) => (
                    <TableBody
                      key={0}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}

                      {/* {stableSort(rows, getComparator(order, orderBy)) */}
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.news_id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <Draggable
                              key={row.news_id}
                              draggableId={"q-" + row.news_id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  hover
                                  onClick={(event) =>
                                    handleClick(event, row.news_id)
                                  }
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.news_id}
                                  selected={isItemSelected}
                                >
                                  <TableCell align="center">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      value={row.news_id}
                                      // checked={ids.includes(row.calories) ? true : false}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </TableCell>

                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {index + 1}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {row.topic}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    {/* <Zoom> */}

                                    <Image
                                      width={100}
                                      height={100}
                                      objectFit="cover"
                                      alt="thumbnail image"
                                      src={productImageURL(
                                        "news",
                                        row.thumbnail
                                      )}
                                      style={{ borderRadius: "5%" }}
                                    />
                                    {/* </Zoom> */}
                                  </TableCell>

                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {row.post_date}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {row.status}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {row.created_at}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="center">
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="center"
                                      spacing={0}
                                    >
                                      <IconButton
                                        color="primary"
                                        aria-label="edit"
                                        size="large"
                                        onClick={() => getEditData(row.news_id)}
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>

                                      <IconButton
                                        color="error"
                                        aria-label="delete"
                                        size="large"
                                        onClick={() => Delete(row.news_id)}
                                      >
                                        <DeleteIcon fontSize="inherit" />
                                      </IconButton>
                                    </Stack>
                                  </TableCell>
                                </TableRow>
                              )}
                            </Draggable>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        disableEnforceFocus={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Formik
              validate={(values) => {
                let errors: any = {};
                if (!values.topic) errors.topic = "Enter Topic";
                if (!values.post_date) errors.post_date = "Enter Post Date";
                if (!values.status) errors.status = "Enter Status";
                // if (values.stock < 3) errors.stock = "Min stock is not lower than 3";
                // if (values.price < 3) errors.price = "Min price is not lower than 3";
                return errors;
              }}
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values.file);
                const value_date = moment(dateSend).toDate();
                const day = value_date.getDate();
                const month = value_date.getMonth() + 1;
                const year = value_date.getFullYear();
                const post_date = year + "-" + month + "-" + day;
                let data = new FormData();
                data.append("topic", values.topic);
                data.append("status", String(addStatus));
                data.append("post_date", String(post_date));
                if (values.file) {
                  data.append("thumbnail", values.file);
                }
                if (editorRef.current) {
                  data.append("detail", editorRef.current.getContent());
                } else {
                  data.append("detail", "");
                }
                const response = await addNews(data);
                handleClose();
                if (response.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your news has been added",
                    "success"
                  ).then(function () {
                    dispatch(getNews());
                  });
                }

                setSubmitting(false);
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        disableEnforceFocus={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Formik
              validate={(values) => {
                let errors: any = {};
                if (!values.topic) errors.topic = "Enter Topic";
                if (!values.post_date) errors.post_date = "Enter Post Date";
                if (!values.status) errors.status = "Enter Status";
                // if (values.stock < 3) errors.stock = "Min stock is not lower than 3";
                // if (values.price < 3) errors.price = "Min price is not lower than 3";
                return errors;
              }}
              initialValues={initialValuesEdit}
              onSubmit={async (values, { setSubmitting }) => {
                const value_date = moment(dateSendEdit).toDate();
                const day = value_date.getDate();
                const month = value_date.getMonth() + 1;
                const year = value_date.getFullYear();
                const post_date = year + "-" + month + "-" + day;
                let data = new FormData();
                data.append("topic", values.topic);
                data.append("status", String(addStatusEdit));
                data.append("post_date", String(post_date));
                data.append("news_id", String(editNewsId));
                if (values.file) {
                  data.append("thumbnail", values.file);
                }
                if (editorEditRef.current) {
                  data.append("detail", editorEditRef.current.getContent());
                } else {
                  data.append("detail", "");
                }
                const response = await editNews(data);
                console.log(response);
                handleCloseEdit();
                if (response.status == "success") {
                  Swal.fire(
                    "Success!",
                    "Your news has been updated",
                    "success"
                  ).then(function () {
                    dispatch(getNews());
                  });
                }

                setSubmitting(false);
              }}
            >
              {(props) => showFormEdit(props)}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
};

export default withAuth(News);
