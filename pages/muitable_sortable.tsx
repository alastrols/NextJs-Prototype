// import React from "react";
// import Layout from "@/components/Layout/Layout";
// import { useSelector } from "react-redux";
// import { userSelector } from "@/store/slices/userSlice";

// type Props = {};

// export default function Index({}: Props) {
//   const user = useSelector(userSelector);
//   return (
//     <Layout>
//       <div>Home {user.username}</div>
//     </Layout>
//   );
// }
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetServerSideProps } from "next";

// ドラッグ&ドロップした要素を入れ替える
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// ドラッグ&ドロップの質問のスタイル
const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  background: isDragging ? "#757ce8" : "white",
  ...draggableStyle,
});
// ドラッグ&ドロップのリストのスタイル
// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "#1769aa" : "lightgrey",
//   padding: "10px"
// });

export const Sortable = () => {
  const [questions, setQuestions] = useState([
    { id: 1, title: "question1" },
    { id: 2, title: "question2" },
    { id: 3, title: "question3" },
    { id: 4, title: "question4" },
    { id: 5, title: "question5" },
  ]);

  const onDragEnd = (result: any) => {
    // ドロップ先がない
    if (!result.destination) {
      return;
    }
    // 配列の順序を入れ替える
    let movedItems: any = reorder(
      questions, //　順序を入れ変えたい配列
      result.source.index, // 元の配列の位置
      result.destination.index // 移動先の配列の位置
    );
    console.log(movedItems);
    setQuestions(movedItems);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>question</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody> */}
        {/*ドラッグアンドドロップの有効範囲 */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* ドロップできる範囲 */}
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <TableBody
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {/*　ドラッグできる要素　*/}
                {questions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={"q-" + question.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "50%" }}
                        >
                          {question.id}
                        </TableCell>
                        <TableCell style={{ width: "50%" }}>
                          {question.title}
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
        {/* </TableBody> */}
      </Table>
    </TableContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};

export default Sortable;
