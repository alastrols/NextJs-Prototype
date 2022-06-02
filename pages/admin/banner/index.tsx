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

import {
  getProducts,
  deleteProduct,
  deleteAllProduct,
  productSelector,
} from "@/store/slices/productSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { ProductData } from "@/models/product.model";
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
    property: keyof ProductData
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

type Props = {};
interface HeadCell {
  disablePadding: boolean;
  id: keyof ProductData;
  label: string;
  numeric: boolean;
}

export const Stock = ({}: Props) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ProductData>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ids, setIds] = React.useState<Array<number>>([]);
  const [searched, setSearched] = React.useState<string>("");

  const productList = useSelector(productSelector);
  // const [rows, setRows] = React.useState(productList ?? []);
  const rows = productList ?? [];

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
            dispatch(deleteAllProduct(id));
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
            dispatch(deleteProduct(id));
            setSelected([]);
          }
        );
      }
    });
  };

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
            Banner
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
    property: keyof ProductData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: any = rows.map((n) => n.id);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // ##################################################
  // ################# Start Dispatch #################
  // ##################################################

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getProducts(searched));
  }, [dispatch, searched]);

  //   interface Window {
  //     Image: {
  //         prototype: HTMLImageElement;
  //         new (): HTMLImageElement;
  //     };
  // }
  // const getBase64Image = (url:any) => {
  //   const img = new window.Image()
  //   img.setAttribute('crossOrigin', 'anonymous');
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     const ctx:any = canvas.getContext("2d");
  //     ctx.drawImage(img, 0, 0);
  //     const dataURL = canvas.toDataURL("image/png");
  //     // console.log(dataURL)
  //     return dataURL;
  //   }
  //   img.src = url
  // }

  async function saveAsExcel() {
    const wb = new Excel.Workbook();

    const ws = wb.addWorksheet();

    // ws.columns = [
    //   { header: "Name", key: "name", width: 30 },
    //   { header: "Price", key: "price", width: 10 },
    //   { header: "Stock", key: "stock", width: 10 },
    //   { header: "CreatedAt", key: "createAt", width: 25 },
    // ];
    ws.columns = [
      { width: 55 },
      { width: 18 },
      { width: 10 },
      { width: 10 },
      { width: 35 },
    ];
    const row: any = ws.addRow([
      "Name",
      "Image",
      "Price",
      "Stock",
      "CreatedAt",
    ]);
    row.font = {
      bold: true,
    };

    let position: number = 2;

    await Promise.all(
      rows.map(async (item): Promise<any> => {
        // let axiosResponse: any = await axios(productImageURL(item.image), {
        //   responseType: "arraybuffer",
        // });
        // const url =
        //   "https://raw.githubusercontent.com/OfficeDev/office-scripts-docs/master/docs/images/git-octocat.png";
        // const url = "https://www.aath-share.com/upload/catalog/1653639084522___test3.png";
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_GET_IMAGE}/${item.image}`;
        // const url  = productImageURL(item.image);

        let axiosResponse: any = await axios.get<
          any,
          AxiosResponse<ArrayBuffer>
        >(url, {
          responseType: "arraybuffer",
        });
        const content = ws.addRow([
          item.name,
          "",
          item.price,
          item.stock,
          item.createdAt,
        ]);
        content.height = 100;
        // console.log(item.image);

        const dataBuffer = Buffer.from(axiosResponse.data, "binary").toString(
          "base64"
        );
        var imageID = wb.addImage({
          base64: dataBuffer,
          extension: "png",
        });
        ws.addImage(imageID, `B${position}:B${position}`);

        position++;
      })
    );
    // const url = getBase64Image('https://uploads.sitepoint.com/wp-content/uploads/2015/12/1450377118cors3.png')
    //   console.log(url)
    // rows.map(async (item) => {

    //   const content = ws.addRow([
    //     item.name,
    //     item.image,
    //     item.price,
    //     item.stock,
    //     item.createdAt,
    //   ]);
    //   content.height = 100;
    //   // console.log(item.image);

    //   // const dataBuffer = Buffer.from(axiosResponse.data, "binary").toString(
    //   //   "base64"
    //   // );
    //   var imageID = wb.addImage({
    //     base64: url,
    //     extension: "png",
    //   });
    //   ws.addImage(imageID, `B${position}:B${position}`);

    //   position++;
    // });

    // ws.eachRow(function (row, rowNumber) {
    //   row.alignment = { vertical: "middle", horizontal: "center" };
    // });

    const buf = await wb.xlsx.writeBuffer();
    await saveAs(new Blob([buf]), "stock.xlsx");
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "image",
      numeric: false,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "stock",
      numeric: true,
      disablePadding: false,
      label: "Stock",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "CreatedAt",
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
      (property: keyof ProductData) => (event: React.MouseEvent<unknown>) => {
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
              // sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label}
              {/* {headCell.id === "image" ? (
                `${headCell.label}`
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )} */}
              {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel> */}
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
            onClick={() => router.push("/admin/banner/add")}
            variant="contained"
            color="primary"
          >
            Add Banner
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
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}

                {/* {stableSort(rows, getComparator(order, orderBy)) */}
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell align="center">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            value={row.id}
                            // checked={ids.includes(row.calories) ? true : false}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">{row.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          {/* <Zoom> */}

                          <Image
                            width={100}
                            height={100}
                            objectFit="cover"
                            alt="product image"
                            src={productImageURL(row.image)}
                            style={{ borderRadius: "5%" }}
                          />
                          {/* </Zoom> */}
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">
                            <NumberFormat
                              value={row.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">{row.stock}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">
                            <Moment format="DD/MM/YYYY HH:mm">
                              {row.createdAt}
                            </Moment>
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
                                router.push("/stock/edit?id=" + row.id)
                              }
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton
                              color="error"
                              aria-label="delete"
                              size="large"
                              onClick={() => Delete(row.id)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
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

export default withAuth(Stock);
