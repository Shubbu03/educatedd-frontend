import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import Loader from "components/loader/Loader";
import { useEffect, useRef, useState } from "react";
import ShowPDF from "./ShowPDF";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  chapter: string;
  completedChapter: string;
  pdfDetails: string;
  arr: any[];
};

function EnrolledCourseDetailsModal({
  isOpen,
  onOpen,
  onClose,
  id,
  title,
  description,
  pdfDetails,
  chapter,
  completedChapter,
  arr,
}: Props) {
  const [courseValues, setCourseValues] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    title: "",
    description: "",
    pdfDetails: "",
    chapter: "",
    completedChapter: "",
    arr: [],
  });

  const [progress, setProgress] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  const initialRef = useRef(null);

  async function updateProgress() {
    const accessToken = localStorage.getItem("accessToken");

    await axios
      .put(
        `http://localhost:3005/courses/enrolled/{id}?CourseID=${courseValues.id}&chapterCompleted=${progress}`,
        {
          data: {
            chapterCompleted: `${progress}`,
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
        onClose();
      });
  }

  // async function setAlreadyExistingProgress() : Promise<StringOrNumber>{
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].id === id) {
  //       setCourseValues({ ...courseValues, completedChapter: arr[i].chapter });
  //       return arr[i].chapter;
  //     }
  //   }
  // }

  // const newValue  = setAlreadyExistingProgress()

  useEffect(() => {
    setCourseValues({
      id: id,
      title: title,
      description: description,
      pdfDetails: pdfDetails,
      chapter: chapter,
      completedChapter: completedChapter,
      arr: arr,
    });
  }, [id, title, description, pdfDetails, chapter, completedChapter, arr]);
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
          {/* <Progress value={progress} /> */}
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{description}</ModalBody>
          <ModalBody>
            <ShowPDF />
          </ModalBody>

          <ModalBody pb={6}>Total Chapters: {chapter}</ModalBody>

          <FormControl mt={4}>
            <FormLabel ml={5}>Completed Chapters: </FormLabel>
            <NumberInput
              ml={5}
              mr={50}
              defaultValue={completedChapter}
              max={Number(chapter)}
              onChange={(e) => setProgress(Number(e.valueOf()))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <ModalFooter>
            <Button onClick={updateProgress} colorScheme="blue" mr={3}>
              OK
            </Button>
            <Button
              onClick={() => {
                onClose();
                setCourseValues({
                  id: "",
                  title: "",
                  description: "",
                  pdfDetails: "",
                  chapter: "",
                  completedChapter: "",
                  arr: [],
                });
              }}
              colorScheme="red"
              mr={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EnrolledCourseDetailsModal;
