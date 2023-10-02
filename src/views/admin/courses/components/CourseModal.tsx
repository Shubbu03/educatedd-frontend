import { useState, useRef, useEffect } from "react";
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
// import Keywords from "./Keywords";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "components/loader/Loader";

// type EditVal = {
//   id: string;
//   title: string;
//   description: string;
// };

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  // editValues: EditVal
  id: string;
  title: string;
  description: string;
};

function CourseModal({
  isOpen,
  onOpen,
  onClose,
  // editValues
  id,
  title,
  description,
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    desc: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

  const courseAddedToast = () =>
    toast.success("Course Added Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function extractFileNameWithoutExtension(filename: string) {
    const lastIndex = filename.lastIndexOf(".");

    if (lastIndex !== -1) {
      return filename.substring(0, lastIndex);
    } else {
      return filename;
    }
  }

  const addNewCourse = async (e: any) => {
    e.preventDefault();

    //call /courses/POST from here!!
    const accessToken1 = localStorage.getItem("accessToken");
    setDataLoaded(true);
    const urlExt = localStorage.getItem("pdfDetails");
    const url = extractFileNameWithoutExtension(urlExt);
    console.log("Received url is::", url);
    // const url = "random222";
    await axios
      .post(
        `http://localhost:3005/courses?Title=${courseValues.name}&Description=${courseValues.desc}&pdfDetails=${url}`,
        {},
        {
          headers: {
            "x-api-token": `${accessToken1}`,
          },
        }
      )
      .then((res) => {
        console.log("the posted course is:", res);
        // setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoaded(false);
        courseAddedToast();
      });

    onClose();
  };

  const editCourses = async () => {
    const editId = id;
    const accessToken = localStorage.getItem("accessToken");

    console.log("edited title and desc are::", title, description);

    // await axios.put(
    //   `http://localhost:3005/courses/${editId}`,
    //   {
    //     data: {
    //       title: `${title}`,
    //       description: `${description}`,
    //     },
    //   },
    //   {
    //     headers: {
    //       "x-api-token": `${accessToken}`,
    //     },
    //   }
    // );
  };

  // useEffect(() => {
  //   console.log("edited values aree::", editValues.id, editValues.title, editValues.description);
  // }, [editValues.id, editValues.title, editValues.description]);

  useEffect(() => {
    console.log("edited values are::", id, title, description);
    setCourseValues({ id: id, name: title, desc: description });
  }, [id, title, description]);

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
                  setCourseValues({ id: "", name: e.target.value, desc: "" })
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
                    id: "",
                    name: courseValues.name,
                    desc: e.target.value,
                  })
                }
                placeholder="Enter Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Files</FormLabel>
              <Uploader />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Keywords</FormLabel>
              <Keywords />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              // onClick={id ? editCourses : addNewCourse}
              onClick={addNewCourse}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {dataLoaded && <Loader />}
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

export default CourseModal;
