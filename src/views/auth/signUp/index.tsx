import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import DropMenu from "./Menu";
import illustration from "assets/img/auth/illustration.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const history = useHistory();

  const successToast = () =>
    toast.success("User Created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const errorToast = () =>
    toast.error("User already exists!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  type CreateUserResponse = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    code: number;
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [names, setNames] = React.useState({ firstName: "", lastName: "" });
  const [detail, setDetails] = React.useState({ email: "", password: "" });

  async function createUser() {
    const userRole = localStorage.getItem("role");
    try {
      const { data, status } = await axios.post<CreateUserResponse>(
        "http://localhost:3005/users/account",
        {
          firstName: names.firstName,
          lastName: names.lastName,
          email: detail.email,
          role: userRole,
          password: detail.password,
          code: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "null",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      if (data.code === 200) {
        history.push("/admin");
        successToast();
      } else {
        history.push("/register");
        errorToast();
      }

      console.log(status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  return (
    <>
      <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign Up
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              New here??Well hello!!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                First Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={names.firstName}
                onChange={(e) =>
                  setNames({ firstName: e.target.value, lastName: "" })
                }
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Last Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={false}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                value={names.lastName}
                onChange={(e) =>
                  setNames({
                    firstName: names.firstName,
                    lastName: e.target.value,
                  })
                }
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                value={detail.email}
                onChange={(e) =>
                  setDetails({ email: e.target.value, password: "" })
                }
                mb="24px"
                fontWeight="500"
                size="lg"
              />

              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Role<Text color={brandStars}>*</Text>
              </FormLabel>
              <div>
                <DropMenu />
              </div>

              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>

              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  value={detail.password}
                  onChange={(e) =>
                    setDetails({
                      email: detail.email,
                      password: e.target.value,
                    })
                  }
                  type={show ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
              </Flex>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                onClick={createUser}
              >
                Sign Up
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Already registered??
                <NavLink to="/login">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                    Log in
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
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

export default SignUp;
