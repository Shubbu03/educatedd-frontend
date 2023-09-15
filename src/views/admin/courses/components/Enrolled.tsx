import {
  Box,
  Text,
  Flex,
  Icon,
  Progress,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import { MdCheckCircle, MdOutlineError, MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import CourseModal from "./CourseModal";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex";
import DeleteConfirmModal from "./DeleteConfirmModal";

type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

function Enrolled() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [isOpen, setIsOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NAME
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
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          STATUS
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === "Published"
                ? "green.500"
                : info.getValue() === "Draft"
                ? "orange.500"
                : null
            }
            as={
              info.getValue() === "Published"
                ? MdCheckCircle
                : info.getValue() === "Draft"
                ? MdOutlineError
                : null
            }
          />
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
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
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
        <Flex align="center">
          <Progress
            variant="table"
            colorScheme="brandScheme"
            h="8px"
            w="108px"
            value={info.getValue()}
          />
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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        tableData={tableDataComplex}
        columns={columns}
        title={"Courses"}
      />
      <CourseModal
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <DeleteConfirmModal
         isOpen={isDeleteOpen}
         onOpen={()=>setIsDeleteOpen(true)}
         onClose={()=>setIsDeleteOpen(false)}
         />
    </Box>
  );
}

export default Enrolled;
