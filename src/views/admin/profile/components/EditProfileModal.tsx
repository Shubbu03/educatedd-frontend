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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "components/loader/Loader";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

function EditProfileModal({
  isOpen,
  onOpen,
  onClose,
  id,
  firstName,
  lastName,
  email,
  password,
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

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

  const editCourses = async (e: any) => {
    e.preventDefault();

    const editId = id;
    const accessToken = localStorage.getItem("accessToken");

    console.log(
      "edited details are::",
      courseValues.firstName,
      courseValues.lastName,
      courseValues.email,
      courseValues.password
    );

    await axios
      .put(
        `http://localhost:3005/users/edit/${editId}`,
        {
          data: {
            firstName: `${courseValues.firstName}`,
            lastname: `${courseValues.lastName}`,
            email: `${courseValues.email}`,
            password: `${courseValues.password}`,
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
        if (res.data.status === 200) {
          courseEditedToast();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setDataLoaded(false);
      });

    onClose();
  };

  useEffect(() => {
    console.log(
      "edited title and desc are::",
      courseValues.firstName,
      courseValues.lastName,
      courseValues.email,
      courseValues.password
    );
    setCourseValues({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }, [id, firstName, lastName, email, password]);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.firstName}
                onChange={(e) =>
                  setCourseValues({
                    ...courseValues,
                    firstName: e.target.value,
                  })
                }
                placeholder="Enter FirstName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.lastName}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, lastName: e.target.value })
                }
                placeholder="Enter LastName"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.email}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, email: e.target.value })
                }
                placeholder="Enter Email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                ref={initialRef}
                value={courseValues.password}
                onChange={(e) =>
                  setCourseValues({ ...courseValues, password: e.target.value })
                }
                placeholder="Enter New Password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={editCourses} colorScheme="blue" mr={3}>
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

export default EditProfileModal;
