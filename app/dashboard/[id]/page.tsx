"use client";

import React, { useState } from "react";
import {
  Heading,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Center,
  Box,
  Skeleton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import { I_DataSampleItem } from "@/models/dataSampleItem";
import { ChartApp } from "./chart";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { dataSampleApi } from "@/api-client";
const DataItem = ({ params }: { params: { id: string } }) => {
  const [dataChart, setDataChart] = useState<number[]>([]);

  const { data, error, status, isLoading } = useQuery({
    queryKey: ["data", params],
    queryFn: () => dataSampleApi.getDataItem(params.id),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  //handle
  function handleShowChart(arrayData: number[]) {
    setDataChart(arrayData);
    onOpen();
  }
  return (
    <Box paddingX={"30px"}>
      <Box
        marginBottom={"20px"}
        display={"flex"}
        alignItems={"center"}
        gap={"16px"}
        paddingTop={"30px"}
      >
        <Button
          onClick={() => {
            router.back();
          }}
          colorScheme="blue"
          backgroundColor={"blue.500"}
        >
          <BiArrowBack></BiArrowBack>
        </Button>
        <Heading>Data Sample Item</Heading>
      </Box>
      {!isLoading ? (
        <TableContainer className="w-full">
          <Table size="md" variant="simple" key={Math.random()}>
            <Thead>
              <Tr>
                <Th className="">ID</Th>
                <Th>Name</Th>
                <Th textAlign={"center"}>angle_id</Th>
                <Th>date</Th>
                <Th textAlign={"center"}>status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item: I_DataSampleItem, index: number) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td cursor={"pointer"}>{item.name}</Td>
                  <Td textAlign={"center"}>{item.angle_id}</Td>
                  <Td>
                    {format(new Date(item.date), "dd MMMM yyyy HH:mm:ss")}
                  </Td>
                  <Td textAlign={"center"}>{item.status}</Td>
                  {/* <Td>
                    <Button
                      onClick={() => {
                        handleShowChart(item.predict_result);
                      }}
                    >
                      Show Chart
                    </Button>
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Stack paddingTop={"20px"}>
          <Skeleton key={uuidv4()} height="40px" />
          <Skeleton key={uuidv4()} height="40px" />
          <Skeleton key={uuidv4()} height="40px" />
        </Stack>
      )}

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Predict Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChartApp ChartData={dataChart}></ChartApp>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default DataItem;
