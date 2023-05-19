/* eslint-disable react/jsx-no-undef */
"use client";
import {
  Box,
  Flex,
  FormControl,
  Heading,
  Stack,
  chakra,
  Input,
  Button,
  Link,
  Icon,
  Text,
  FormLabel,
  Checkbox,
  Center,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC, useState } from "react";
import { FaUserAlt, FaLock, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import { Resolver, useForm } from "react-hook-form";
import { I_Login } from "@/models/auth";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import { error } from "console";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage: FC = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errMess, setErrMess] = useState("")
  const { data: session, status } = useSession();
  const RequireAuth = useRequireAuth();
  const toast = useToast()
  const router = useRouter();
  const handleShowClick = () => setShowPassword(!showPassword);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<I_Login>();
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);

  async function loginWithGoogle() {
    try {
      await signIn("google");
    } catch (error) {
    } finally {
    }
  }
  const onSubmit = handleSubmit(async (data) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.replace("/dashboard");
        toast({
          title: 'Login Success',
          description:"" ,
          status: 'success',
          duration: 3000,
          isClosable: false,
        })
      } else {
        reset({ username: "", password: "" });
        toast({
          title: 'Login Failed',
          description: res?.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    });
  });
  return hydrated && !session ? (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <form onSubmit={onSubmit}>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="username" isInvalid={!!errors.username}>
                <FormLabel htmlFor="username">Email address</FormLabel>
                <Input
                  {...register("username", {
                    required: "This is required",
                    pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:"Invalid email address"}
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "This is required",
                        minLength: {
                          value: 6,
                          message: "Minimum length should be 6",
                        },
                      })}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          handleShowClick()
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
                <Button
                  w={"full"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  // onClick={() => signIn("google")}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Stack>
              <Box flexDirection={"row"} display={"flex"} gap={"4px"}>
                <Text>Dont have an account?</Text>
                <Link color="blue.500" as={NextLink} href="./signup">
                  <Text cursor={"pointer"} color="blue.500">
                    Sign Up
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  ) : (
    <></>
  );
};

export default LoginPage;
