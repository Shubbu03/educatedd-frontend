import {
  Box,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Progress,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Loader from "components/loader/Loader";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

type RowObj = {
  title: string;
  description: string;
  date: string;
  progress: number;
  button: string;
};

const columnHelper = createColumnHelper<RowObj>();

function ShowEnrolled() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const history = useHistory();

  const [dataLoaded, setDataLoaded] = useState(false);

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

    columnHelper.accessor("progress", {
      id: "progress",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          PROGRESS
        </Text>
      ),
      cell: (info) => (
        <>
          <Flex align="center">
            <Progress
              variant="table"
              colorScheme="brandScheme"
              h="8px"
              w="108px"
              value={info.getValue()}
            />
          </Flex>
        </>
      ),
    }),

    columnHelper.accessor("button", {
      id: "button",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DETAILS
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
                  console.log("OPEN BUTTON CLICKED!!");
                  // setIsOpen(true);

                  // setPropVal({
                  //   id: info.row.original.id,
                  //   title: info.row.original.title,
                  //   description: info.row.original.description,
                  // });
                  // console.log("info from edit is::",info)
                }}
              >
                {/* <Icon
                  transition="0.2s linear"
                  w="20px"
                  h="20px"
                  as={MdEdit}
                  color="brand.500"
                /> */}
                View
              </Button>

              {/* <Button
                position="relative"
                bg="white"
                _hover={{ bg: "whiteAlpha.900" }}
                _active={{ bg: "white" }}
                _focus={{ bg: "white" }}
                p="0px !important"
                minW="36px"
                h="36px"
                onClick={() => {
                  // setIsDeleteOpen(true);
                  // setID(info.row.original.id);
                }}
              >
                <Icon
                  transition="0.2s linear"
                  w="20px"
                  h="20px"
                  as={MdDelete}
                  color="brand.500"
                />
              </Button> */}
            </>
          }
        </Flex>
      ),
    }),
  ];

  async function getEnrolledUserCourses() {
    const accessToken = localStorage.getItem("accessToken");
    setDataLoaded(true);
    await axios
      .get("http://localhost:3005/courses/enrolled/user", {
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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDataLoaded(false));
  }

  useEffect(() => {
    getEnrolledUserCourses();
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <ComplexTable
          tableData={rows}
          columns={columns}
          title={"Enrolled Courses"}
        />
        {dataLoaded && <Loader />}
      </Box>
    </>
  );
}

export default ShowEnrolled;
