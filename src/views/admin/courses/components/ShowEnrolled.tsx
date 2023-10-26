import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  Text,
  Progress,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Loader from "components/loader/Loader";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import EnrolledCourseDetailsModal from "./EnrolledCourseDetails";

type RowObj = {
  title: string;
  description: string;
  id: string;
  chapter: string;
  pdfDetails: string;
  progress: number;
  button: string;
};

type Data = {
  title: string;
  description: string;
  chapter: string;
  progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

function ShowEnrolled() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const history = useHistory();

  const [dataLoaded, setDataLoaded] = useState(false);

  const [rows, setRows] = useState([]);

  const [propVal, setPropVal] = useState({
    id: "",
    title: "",
    description: "",
    pdfDetails: "",
    chapter: "",
  });

  const [progressProp, setProgressProp] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  let arr1: any[] = [];
  let arr2: any[] = [];

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

    columnHelper.accessor("chapter", {
      id: "chapter",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          CHAPTER
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
                  setPropVal({
                    id: info.row.original.id,
                    title: info.row.original.title,
                    description: info.row.original.description,
                    pdfDetails: info.row.original.pdfDetails,
                    chapter: info.row.original.chapter,
                  });
                  console.log("enter view");
                  passProgressProp(info.row.original.id);
                  setIsOpen(true);
                }}
              >
                View
              </Button>
            </>
          }
        </Flex>
      ),
    }),
  ];

  //ENTRY POINT FUNCTION FOR THE PAGE->

  async function getEnrolledUserCourses() {
    const accessToken = localStorage.getItem("accessToken");
    setDataLoaded(true);
    await axios
      .get("http://localhost:3005/courses/enrolled/user", {
        headers: {
          "x-api-token": `${accessToken}`,
        },
      })
      .then(async (res) => {
        if (res.data.code === 200) {
          const value = res.data.data;
          const mappedData = value.map((item: any) => {
            arr2.push(item);
            passProgressProp(item.id);
            return {
              title: item.title,
              id: item.id,
              description: item.description,
              pdfDetails: item.pdfDetails,
              chapter: item.chapter,
              progress: 0,
            };
          });
          await getProgressFromRequest(mappedData);
        } else {
          localStorage.setItem("accessToken", "");
          history.push("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoaded(false);
      });
  }

  async function getProgressFromRequest(mappedData: any) {
    const accessToken1 = localStorage.getItem("accessToken");
    await axios
      .get("http://localhost:3005/courses/enrolled/chapter", {
        headers: {
          "x-api-token": `${accessToken1}`,
        },
      })
      .then((res) => {
        let val = 0;
        mappedData.forEach((e1: any) => {
          res.data.data.forEach((e2: any) => {
            if (e1.id === e2.id) {
              val = (e2.chapter / e1.chapter);
              if(val > 0){
                e1.progress = val * 100;
              }
              else{
                e1.progress = 0;
              }
            }
          });
        });
        setRows(mappedData);
      });
  }

  async function passProgressProp(id: any) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id === id) {
        setProgressProp(arr1[i].chapter);
        console.log("SET ID is:", progressProp);
      }
    }
  }

  useEffect(() => {
    getEnrolledUserCourses();
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {dataLoaded && <Loader />}
        <ComplexTable
          tableData={rows}
          columns={columns}
          title={"Enrolled Courses"}
        />
        <EnrolledCourseDetailsModal
          isOpen={isOpen}
          onOpen={() => {
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
            getEnrolledUserCourses();
          }}
          id={propVal.id}
          title={propVal.title}
          description={propVal.description}
          pdfDetails={propVal.pdfDetails}
          chapter={propVal.chapter}
          arr={arr1}
          completedChapter={progressProp}
        />
      </Box>
    </>
  );
}

export default ShowEnrolled;
