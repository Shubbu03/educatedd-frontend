import {
  Box,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import Loader from "components/loader/Loader";
import { useEffect, useRef, useState } from "react";
import Details from "./Details";
import ShowPDF from "./ShowPDF";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  pdfDetails: string;
};

function EnrolledCourseDetailsModal({
  isOpen,
  onOpen,
  onClose,
  id,
  title,
  description,
  pdfDetails,
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    title: "",
    description: "",
    pdfDetails: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

  useEffect(() => {
    // console.log("COURSE ID IS::", id);

    setCourseValues({
      id: id,
      title: title,
      description: description,
      pdfDetails: pdfDetails,
    });
  }, [id, title, description, pdfDetails]);
  return (
    <>
      {dataLoaded && <Loader />}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {description} 
          </ModalBody>
          <ModalBody>
            <ShowPDF />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" mr={3}>
              OK
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EnrolledCourseDetailsModal;
