/*eslint-disable*/

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px={{ base: "30px", md: "50px" }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        {" "}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          Educatedd. All Rights Reserved. Made with love by
          <Link
            mx="3px"
            color={textColor}
            href="https://www.linkedin.com/in/shubham-sharma-446985201/"
            target="_blank"
            fontWeight="700"
          >
            Shubham
          </Link>
        </Text>
      </Text>
      {/* <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/admin">
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/admin">
            License
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/admin">
            Terms of Use
          </Link>
        </ListItem>
      </List> */}
    </Flex>
  );
}
