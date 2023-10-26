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

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  chapter: string;
};

function CourseModal({
  isOpen,
  onOpen,
  onClose,
  id,
  title,
  description,
  chapter,
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    desc: "",
    chapter: "",
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

  const courseEditedToast = () =>
    toast.success("Course Edited Successfully", {
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

    await axios
      .post(
        `http://localhost:3005/courses?Title=${courseValues.name}&Description=${courseValues.desc}&pdfDetails=${url}&chapter=${courseValues.chapter}`,
        {},
        {
          headers: {
            "x-api-token": `${accessToken1}`,
          },
        }
      )
      .then((res) => {
        console.log("the newly added course is:", res);
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

  const editCourses = async (e: any) => {
    e.preventDefault();

    const editId = id;
    const accessToken = localStorage.getItem("accessToken");

    console.log(
      "edited title and desc are::",
      courseValues.name,
      courseValues.desc
    );

    await axios
      .put(
        `http://localhost:3005/courses/${editId}`,
        {
          data: {
            title: `${courseValues.name}`,
            description: `${courseValues.desc}`,
            chapter: `${courseValues.chapter}`,
          },
        },
        {
          headers: {
            "x-api-token": `${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("the edited course is:", res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoaded(false);
        courseEditedToast();
      });

    onClose();
  };

  useEffect(() => {
    console.log(
      "edited title and desc are::",
      courseValues.name,
      courseValues.desc
    );
    setCourseValues({
      id: id,
      name: title,
      desc: description,
      chapter: chapter,
    });
  }, [id, title, description, chapter]);

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
                  setCourseValues({ ...courseValues, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={courseValues.desc}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, desc: e.target.value })
                }
                placeholder="Enter Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Files</FormLabel>
              <Uploader />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Chapters</FormLabel>
              <Input
                value={courseValues.chapter}
                onChange={(e) =>
                  setCourseValues({
                    ...courseValues,
                    chapter: String(e.target.value),
                  })
                }
                placeholder="Enter Number of Chapter"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={courseValues.id.length ? editCourses : addNewCourse}
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
