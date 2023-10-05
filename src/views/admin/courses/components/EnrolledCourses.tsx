import {
  Box,
  Text,
  Flex,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  // PaginationState,
  // getFilteredRowModel,
  // getPaginationRowModel,
  // ColumnDef,
  // OnChangeFn,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import CourseModal from "./CourseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import axios from "axios";
import Loader from "components/loader/Loader";
import { useHistory } from "react-router-dom";
import EnrolledModal from "./EnrolledModal";

type RowObj = {
  title: string;
  description: string;
  date: string;
  id: string;
  buttons: string;
};

const columnHelper = createColumnHelper<RowObj>();

function EnrolledCourses() {
  // const rerender = React.useReducer(() => ({}), {})[1]

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [propVal, setPropVal] = useState({
    id: "",
    title: "",
    // description: "",
  });

  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const [rows, setRows] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [id, setID] = useState("");

  const columns = [
    columnHelper.accessor("title", {
      id: "title",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          TITLE
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("description", {
      id: "description",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DESCRIPTION
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),

    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DATE
        </Text>
      ),
      cell: (info) => (
        <>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </>
      ),
    }),

    columnHelper.accessor("buttons", {
      id: "buttons",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ENROLL
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          {
            <>
              <Button
                position="relative"
                bg="white"
                _hover={{ bg: "whiteAlpha.900" }}
                _active={{ bg: "white" }}
                _focus={{ bg: "white" }}
                p="0px !important"
                minW="36px"
                h="36px"
                onClick={() => {
                  setIsOpen(true);
                  // // setID(info.row.original.id);
                  // // setEditValues({
                  // //   title: info.row.original.title,
                  // //   description: info.row.original.description,
                  // // });
                  setPropVal({
                    id: info.row.original.id,
                    title: info.row.original.title,
                    // description: info.row.original.description,
                  });
                  //   console.log("ENROLLED IN COURSE!!!!!");
                }}
              >
                {/* <Icon
                    transition="0.2s linear"
                    w="20px"
                    h="20px"
                    as={MdEdit}
                    color="brand.500"
                  /> */}
                Enroll
              </Button>
            </>
          }
        </Flex>
      ),
    }),
  ];

  async function getUserCourses() {
    const accessToken = localStorage.getItem("accessToken");
    setDataLoaded(true);
    await axios
      .get("http://localhost:3005/courses", {
        headers: {
          "x-api-token": `${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          const value = res.data.data;
          const mappedData = value.map((item: any) => {
            const date = new Date(item.createdAt);
            const readableDate = `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;

            return {
              title: item.title,
              id: item.id,
              description: item.description,
              date: readableDate,
            };
          });
          setRows(mappedData);
          console.log("Retrieved courses are::", mappedData);
        } else {
          localStorage.setItem("accessToken", "");
          history.push("/login");
        }

        // const value = res.data.data;
        // const mappedData = value.map((item: any) => {
        //   const date = new Date(item.createdAt);
        //   const readableDate = `${date.getDate()}/${
        //     date.getMonth() + 1
        //   }/${date.getFullYear()}`;

        //   return {
        //     title: item.title,
        //     id: item.id,
        //     description: item.description,
        //     date: readableDate,
        //   };
        // });
        // setRows(mappedData);
        // console.log("Retrieved courses are::", mappedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDataLoaded(false));
  }
  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <ComplexTable tableData={rows} columns={columns} title={"Courses"} />
        {dataLoaded && <Loader />}

        <EnrolledModal
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => {
            setIsOpen(false);
            getUserCourses();
          }}
          id={propVal.id}
          title={propVal.title}
        />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EnrolledCourses;
