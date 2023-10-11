import {
  // Box,
  // Progress,
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
import Loader from "components/loader/Loader";
import { useEffect, useRef, useState } from "react";
// import Details from "./Details";
import ShowPDF from "./ShowPDF";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  chapter: string;
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
  chapter
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    title: "",
    description: "",
    pdfDetails: "",
    chapter:""
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

  useEffect(() => {
    setCourseValues({
      id: id,
      title: title,
      description: description,
      pdfDetails: pdfDetails,
      chapter: chapter
    });
  }, [id, title, description, pdfDetails,chapter]);
  return (
    <>
      {dataLoaded && <Loader />}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          {/* <Progress value={100} w="max-content"/> */}
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{description}</ModalBody>
          <ModalBody>
            <ShowPDF />
          </ModalBody>

          <ModalBody pb={6}>Total Chapters: {chapter}</ModalBody>

          {/* <FormControl mt={4}>
              <FormLabel>Completed Chapters: </FormLabel>
              <Input
                // value={courseValues.desc}
                // onChange={(e) =>
                //   setCourseValues({ ...courseValues, desc: e.target.value })
                // }
                placeholder="Enter Completed Chapters"
              />
            </FormControl> */}

          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" mr={3}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EnrolledCourseDetailsModal;
