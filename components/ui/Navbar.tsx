"user client";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} className="" >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box className="text-primary">Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
          </HStack>
        </HStack>
        {!!session && (
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Text
                    fontFamily={"heading"}
                    whiteSpace={"nowrap"}
                    paddingRight={"10px"}
                  >
                    {session.user.fullName}
                  </Text>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: "/login",
                    })
                  }
                >
                  <Text fontSize={"sm"} fontWeight={400}>
                    Sign out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
