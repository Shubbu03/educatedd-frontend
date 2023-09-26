import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Uploader from "./Uploader";
import Keywords from "./Keywords";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function CourseModal({ isOpen, onOpen, onClose }: Props) {
  const [courseValues, setCourseValues] = useState({
    name: "",
    desc: "",
  });

  const initialRef = useRef(null);
  //   const finalRef = React.useRef(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(
    //   `Course name is: ${courseValues.name} & desc is: ${courseValues.desc}`
    // );

    //call /courses/POST from here!!
    const accessToken = localStorage.getItem("accessToken");

   await axios
      .post(
        // `http://localhost:3005/courses/`,
        `http://localhost:3005/courses?Title=${courseValues.name}&Description=${courseValues.desc}&pdfDetails=cyukt`,
        {
          // data: {
          //   Title: courseValues.name,
          //   Description: courseValues.desc,
          //   pdfDetails: "cyukt",
          // },
          headers: {
            "accept": "application/json",
            "x-api-token": `${accessToken}`,
          },
          data: {
            // Title: courseValues.name,
            // Description: courseValues.desc,
            // pdfDetails: "cyukt",
          },
        }
      )
      .then((res) => {
        console.log("the posted course is:", res);
      })
      .catch((error) => {
        console.error(error);
      });

    uploadFile();
    onClose();
  };

  const uploadFile = () => {
    console.log("file uploaded");
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new course</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.name}
                onChange={(e) =>
                  setCourseValues({ name: e.target.value, desc: "" })
                }
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={courseValues.desc}
                onChange={(e) =>
                  setCourseValues({
                    name: courseValues.name,
                    desc: e.target.value,
                  })
                }
                placeholder="Enter Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Files</FormLabel>
              {/* <Uploader handleSubmit={uploadFile} /> */}
              <Uploader />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Keywords</FormLabel>
              <Keywords />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CourseModal;
