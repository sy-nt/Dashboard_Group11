"use client";
import {
  Box,
  Flex,
  FormControl,
  Heading,
  InputGroup,
  InputLeftElement,
  Stack,
  chakra,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  Link,
  Text,
  HStack,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { I_Login, I_Signup } from "@/models/auth";
import { AuthApi } from "@/api-client";
import { useRouter } from "next/navigation";
const SignUpPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<I_Signup>();
  const toast = useToast();
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  const handleSignup = handleSubmit(async (data) => {
    const signUp = await AuthApi.signup(data);
    console.log(signUp.error)
    if (signUp.statusCode || signUp.error) {
      toast({
        title: "Sign up",
        description: signUp.message,
        status: "error",
        duration: 3000,
        isClosable: false,
      });
      reset({ username: "", password: "" });
    } else {
      toast({
        title: "Sign up",
        description: "Sign up successfully",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      router.replace("/login");
    }
  });

  return hydrated ? (
    <>
      <Flex minH={"100%"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}></Text>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSignup}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isInvalid={!!errors.firstName}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        {...register("firstName", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                          maxLength: {
                            value: 20,
                            message: "max length must be 20",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isInvalid={!!errors.lastName}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        {...register("lastName", {
                          required: "This is required",
                          maxLength: {
                            value: 20,
                            message: "max length must be 20",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isInvalid={!!errors.username}>
                  <FormLabel>username</FormLabel>
                  <Input
                    {...register("username", {
                      required: "This is required",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Invalid email address",
                      },
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
                          setShowPassword((showPassword) => !showPassword)
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
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Box flexDirection={"row"} display={"flex"} gap={"4px"}>
                  <Text>Already a user?</Text>
                  <Link color="blue.500" as={NextLink} href="./login">
                    <Text cursor={"pointer"} color="blue.500">
                      Sign In
                    </Text>
                  </Link>
                </Box>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  ) : (
    <></>
  );
};

export default SignUpPage;
