import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

type DeleteProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  // id: () => void;
};

function DeleteConfirmModal({ isOpen, onOpen, onClose }: DeleteProps) {
  const initialRef = React.useRef(null);

  const deleteCourse = async () => {
    // const data = res.data.data
    // console.log("data from delete ::",data)
    // const id =
    const accessToken = localStorage.getItem("accessToken");
    await axios.delete(`http://localhost:3005/courses/delete/29e375cb-7075-4bf8-9c6f-8e172eb1cb10`, {
      headers: {
        "accept": "application/json",
        "x-api-token": `${accessToken}`,
      },
    })
    .then((res) => {
      console.log("the course is deleted:", res);
    })
    .catch((error) => {
      console.error(error);
    });

    // console.log("Course Deleted Successfully");
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Course!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>
              Are you sure you want to delete this course?? This can't be undone
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteCourse}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteConfirmModal;
