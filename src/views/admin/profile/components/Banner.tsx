// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { info } from "console";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";

export default function Banner(props: {
  banner: string;
  avatar: string;
  id: string;
  name: string;
  lastName: string;
  role: string;
  email: string;
  [x: string]: any;
}) {
  const { banner, avatar,id, name, lastName, role, email, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [propval,setPropVal] = useState({
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} alignItems="center" {...rest}>
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Flex mx={"auto"}>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="xl"
          mt="10px"
        >
          {name}
        </Text>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="xl"
          mt="10px"
        >
          {lastName}
        </Text>
      </Flex>

      <Text color={textColorSecondary} fontSize="sm">
        {role}
      </Text>
      <Flex w="max-content" mx="50px" mt="50px">
        <Flex mx="auto" me="35px" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {email}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Primary Email
          </Text>
        </Flex>

        <Flex mx="auto" me="35px" alignItems="center" flexDirection="column">
          <Button
            position="relative"
            bg="white"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p="0px !important"
            minW="36px"
            h="36px"
            onClick={() => {
              setIsOpen(true);
                setPropVal({
                  id: id,
                  firstName: name,
                  lastName: lastName,
                  email: email,
                  password: ""
                });
            }}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={MdEdit}
              color="brand.500"
            />
          </Button>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Edit Details
          </Text>
        </Flex>
      </Flex>
      <EditProfileModal
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => {
          setIsOpen(false);
        }}
        id={id}
        firstName={name}
        lastName={lastName}
        email={email}
        password={""}
      />
    </Card>
  );
}
