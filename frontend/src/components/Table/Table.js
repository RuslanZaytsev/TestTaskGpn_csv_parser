import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { getCSV } from "../../request/request";
import Loader from "../Loader/Loader";

import "./Table.css";

const columns = [
  {
    id: "article_type_name",
    align: "center",
    label: "Article Type Name",
    minWidth: 110,
  },
  {
    id: "articlebarcode",
    align: "center",
    label: "Article Barcode",
    minWidth: 100,
  },
  {
    id: "articleid",
    label: "Article Id",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "articlename",
    label: "Article Name",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "articletype",
    label: "Article Type",
    minWidth: 110,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "baseprice",
    label: "Base Price",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  function createData(
    article_type_name,
    articlebarcode,
    articleid,
    articlename,
    articletype,
    baseprice
  ) {
    //   const density = population / size;
    return {
      article_type_name,
      articlebarcode,
      articleid,
      articlename,
      articletype,
      baseprice,
    };
  }

  const rows = data.map((object) =>
    createData(
      object?.article_type_name,
      object?.articlebarcode,
      object?.articleid,
      object?.articlename,
      object?.articletype,
      object?.baseprice
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getCSV().then((data) => {
      setData(data);
      if (data.length > 0) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 530 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
