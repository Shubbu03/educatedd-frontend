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

type DeleteProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function DeleteConfirmModal({ isOpen, onOpen, onClose }: DeleteProps) {
  const initialRef = React.useRef(null);

  const deleteCourse = () => {
    console.log("Course Deleted Successfully");
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
