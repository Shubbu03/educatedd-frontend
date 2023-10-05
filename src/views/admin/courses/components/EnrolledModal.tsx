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
  //   FormControl,
  //   FormLabel,
  //   Input,
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "components/loader/Loader";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
    title: string;
  //   description: string;
};

function CourseModal({
  isOpen,
  onOpen,
  onClose,
  // editValues
  id,
  title
}: 
Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    // desc: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

  const courseEnrolledToast = () =>
    toast.success("Enrolled in Course Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const enrollCourse = async (e: any) => {
    e.preventDefault();

    // console.log("ENROLLED IN THIS COURSE!!!!");
    const accessToken = localStorage.getItem("accessToken");
    setDataLoaded(true);

    await axios
      .post(
        `http://localhost:3005/courses/enrolled?CourseID=${courseValues.id}`,
        {},
        {
          headers: {
            "x-api-token": `${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("enrolled course details:", res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoaded(false);
        courseEnrolledToast();
      });

    onClose();
    
  };

  useEffect(() => {
    console.log("COURSE ID IS::", id);
    // console.log(
    //   "edited title and desc are::",
    //   courseValues.name,
    //   courseValues.desc
    // );
    setCourseValues({ id: id ,name:title });
  }, [id,title]);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enroll in {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Do you want to enroll in this course?
            {/* <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.name}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </FormControl> */}
            {/* <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={courseValues.desc}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, desc: e.target.value })
                }
                placeholder="Enter Description"
              />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              //   onClick={courseValues.id.length ? editCourses : addNewCourse}
              onClick={enrollCourse}
              colorScheme="blue"
              mr={3}
            >
              Enroll
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
