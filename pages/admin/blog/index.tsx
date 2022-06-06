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
  getBlog,
  blogSelector,
  deleteBlog,
  deleteAllBlog,
  sortableBlog,
} from "@/store/slices/admin/blogSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { BlogData } from "@/models/blog.model";
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
import { Button, Fab, TextField } from "@mui/material";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import axios, { AxiosResponse } from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    property: keyof BlogData
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
  id: keyof BlogData;
  label: string;
  numeric: boolean;
}

export const Blog = ({}: Props) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof BlogData>("arr");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ids, setIds] = React.useState<Array<number>>([]);
  const [searched, setSearched] = React.useState<string>("");
  const [sorted, setSorted] = React.useState<Array<string>>([]);

  const blogList = useSelector(blogSelector);
  // const [rows, setRows] = React.useState(productList ?? []);
  const rows = blogList ?? [];

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
            dispatch(deleteAllBlog(id));
            setSelected([]);
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
            dispatch(deleteBlog(id));
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
    dispatch(sortableBlog(movedItems));
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
            Blog
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
    property: keyof BlogData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const blogSelecteds: any = rows.map((n) => n.blog_id);
      setSelected(blogSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);

    let blogSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      blogSelected = blogSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      blogSelected = blogSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      blogSelected = blogSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      blogSelected = blogSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(blogSelected);
  };

  const handleChangePage = (event: unknown, blogPage: number) => {
    setPage(blogPage);
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
    dispatch(getBlog());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getBlog(searched));
  }, [dispatch, searched]);

  React.useEffect(() => {
    dispatch(getBlog());
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
        const url = productImageURL("blog", item.thumbnail);
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
        position++;
      })
    );
    ws.eachRow(function (row, rowNumber) {
      row.alignment = { vertical: "middle", horizontal: "center" };
    });
    const buf = await wb.xlsx.writeBuffer();
    await saveAs(new Blob([buf]), "blog.xlsx");
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "blog_id",
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
      (property: keyof BlogData) => (event: React.MouseEvent<unknown>) => {
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
            onClick={() => router.push("/admin/blog/add")}
            variant="contained"
            color="primary"
          >
            Add Blog
          </Button>

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
                          const isItemSelected = isSelected(row.blog_id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <Draggable
                              key={row.blog_id}
                              draggableId={"q-" + row.blog_id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  hover
                                  onClick={(event) =>
                                    handleClick(event, row.blog_id)
                                  }
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.blog_id}
                                  selected={isItemSelected}
                                >
                                  <TableCell align="center">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      value={row.blog_id}
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
                                        "blog",
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
                                        onClick={() =>
                                          router.push(
                                            "/admin/blog/edit?id=" + row.blog_id
                                          )
                                        }
                                      >
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                      <IconButton
                                        color="error"
                                        aria-label="delete"
                                        size="large"
                                        onClick={() => Delete(row.blog_id)}
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
    </Layout>
  );
};

export default withAuth(Blog);
