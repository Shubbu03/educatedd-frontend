import {
  Box,
  Text,
  Flex,
  Icon,
  Progress,
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
import {
  MdCheckCircle,
  MdOutlineError,
  MdAdd,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import CourseModal from "./CourseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import axios from "axios";

type RowObj = {
  title: string;
  description: string;
  date: string;
  buttons: string;
};

const columnHelper = createColumnHelper<RowObj>();

function Enrolled() {

  // const rerender = React.useReducer(() => ({}), {})[1]

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [isOpen, setIsOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rows, setRows] = useState([]);

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
          EDITS
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
                }}
              >
                <Icon
                  transition="0.2s linear"
                  w="20px"
                  h="20px"
                  as={MdEdit}
                  color="brand.500"
                />
              </Button>

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
                  setIsDeleteOpen(true);
                  // console.log("course delted")
                  // <DeleteConfirmModal/>
                }}
              >
                <Icon
                  transition="0.2s linear"
                  w="20px"
                  h="20px"
                  as={MdDelete}
                  color="brand.500"
                />
              </Button>
            </>
          }

          <Button
            position="absolute"
            bg="white"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={MdAdd}
              color="brand.500"
            />
          </Button>
        </Flex>
      ),
    }),
  ];

  async function getUserCourses() {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3005/courses", {
        headers: {
          "x-api-token": `${accessToken}`,
        },
      })
      .then((res) => {
        const value = res.data.data;

        const mappedData = value.map((item: any) => {
          const date = new Date(item.createdAt);
          const readableDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;

          return {
            title: item.title,
            id:item.id,
            description: item.description,
            date: readableDate,
          };
        });
        setRows(mappedData);
        console.log("Retrieved courses are::", mappedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <ComplexTable tableData={rows} columns={columns} title={"Courses"} />

        <CourseModal
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />

        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onOpen={() => setIsDeleteOpen(true)}
          onClose={() => setIsDeleteOpen(false)}
          // id={() => {
          //   localStorage.setItem("id",rows[0].id)
          // }}
        />
      </Box>
      {console.log("rows are:", rows)}
    </>
  );
}

export default Enrolled;
