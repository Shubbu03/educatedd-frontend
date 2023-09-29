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
  onConfirm: () => void;
};

function DeleteConfirmModal({ isOpen, onOpen, onClose,onConfirm }: DeleteProps) {
  const initialRef = React.useRef(null);

  // const deleteCourse = async () => {
  //   // const data = res.data.data
  //   // console.log("data from delete ::",data)
  //   // const id =
  //   const accessToken = localStorage.getItem("accessToken");
  //   await axios.delete(`http://localhost:3005/courses/delete/`, {
  //     headers: {
  //       "accept": "application/json",
  //       "x-api-token": `${accessToken}`,
  //     },
  //   },
  //   // {
  //   //   headers: {
  //   //     // 'Access-Control-Allow-Origin':'http://localhost:3005/courses/',
  //   //     // "accept": "application/json",
  //   //     "x-api-token": `${accessToken1}`,
  //   //   },
  //   // }
    
  //   )
  //   .then((res) => {
  //     console.log("the course is deleted:", res);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

    

  //   // console.log("Course Deleted Successfully");
  // };

  

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
            <Button colorScheme="red" mr={3} onClick={onConfirm}>
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
