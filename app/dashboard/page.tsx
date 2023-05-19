/* eslint-disable react/jsx-no-undef */
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
  Text,
  Box,
  IconButton,
  Input,
  InputGroup,
  Select,
  Spinner,
  InputLeftElement,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { dataSampleApi } from "@/api-client";
import { E_sort, I_DataSample, I_PayloadDataSample } from "@/models";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import useDebounce from "@/hooks/useDebounce";
import { Dropdown, DropdownItem } from "@tremor/react";
import { v4 as uuidv4 } from "uuid";
import DashboardPieChart from "@/components/ui/DashboardPieChart";
import useRequireAuth from "@/hooks/useRequireAuth";
import DashboardBarChart from "@/components/ui/DashboardBarChart";
const DataSample = () => {
  const router = useRouter();
  const session = useRequireAuth();
  const [sort, setSort] = useState<E_sort>("asc" as E_sort);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 500);
  const [pageLimit, setPageLimit] = useState("10");
  const [pageIndex, setPageIndex] = useState("1");
  const { data, error, status } = useQuery({
    queryKey: ["getDataSample", debouncedValue, sort, pageIndex, pageLimit],
    queryFn: () =>
      dataSampleApi.getListData(debouncedValue, sort, pageIndex, pageLimit),
    keepPreviousData: true,
  });
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);
  React.useEffect(() => {
    setPageIndex("1");
  }, [debouncedValue]);

  //handle function
  const handleInputSearch = (valueSearch: string) => {
    setSearch(valueSearch);
  };
  const handleChangeSort = (value: E_sort) => {
    setSort(value);
  };

  const handleMoveToDetail = (id: string) => {
    router.push(`dashboard/${id}`);
  };

  const handleChangePageLimit = (pageLimitValue: string) => {
    setPageLimit(pageLimitValue);
    setPageIndex("1");
  };
  const handleChangePageIndex = (pageIndexValue: string) => {
    setPageIndex(pageIndexValue);
  };

  return hydrated ? (
    <Box paddingX={"30px"} className="bg-primary">
      <Box display={"flex"} paddingY={"30px"} gap={"10px"}>
        <Box display={"flex"} w={"50%"} justifyContent={"center"}>
          <DashboardPieChart />
        </Box>
        <Box display={"flex"} w={"50%"} justifyContent={"center"}>
          <DashboardBarChart />
        </Box>
      </Box>
      <Box marginBottom={"20px"}>
        <Heading>Data Sample</Heading>
      </Box>
      <Box display={"flex"} gap={"8px"}>
        <InputGroup>
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search"
            w={"50%"}
            value={search}
            onChange={(e) => handleInputSearch(e.target.value)}
          />
        </InputGroup>

        <Select
          placeholder="Select option"
          value={sort}
          w={"20%"}
          onChange={(e) => handleChangeSort(e.target.value as E_sort)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </Select>
      </Box>
      {status === "loading" ? (
        <Stack paddingTop={"20px"}>
          {Array(Number(pageLimit))
            .fill(null)
            .map(() => (
              <Skeleton key={uuidv4()} height="40px" />
            ))}
        </Stack>
      ) : status === "error" ? (
        <></>
      ) : (
        <Box paddingBottom={"50px"}>
          <TableContainer className="w-2/3 bg-primary">
            <Table size="md" variant="simple" key={Math.random()}>
              <Thead>
                <Tr>
                  <Th className="">ID</Th>
                  <Th>Name data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((item: I_DataSample, index: number) => (
                  <Tr key={index}>
                    <Td>
                      {Number(pageLimit) * (Number(pageIndex) - 1) + index + 1}
                    </Td>
                    <Td
                      onClick={() => handleMoveToDetail(item.id)}
                      cursor={"pointer"}
                    >
                      {item.name_data}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            fontSize={"lg"}
            marginTop={"30px"}
          >
            <Select
              w={"150px"}
              placeholder="No. of rows"
              size={"sm"}
              value={pageLimit}
              onChange={(e) => handleChangePageLimit(e.target.value)}
            >
              <option value="10">No. of rows 10</option>
              <option value="20">No. of rows 20</option>
              <option value="50">No. of rows 50</option>
            </Select>
            <Box display={"flex"} gap={"6px"}>
              <IconButton
                variant="outline"
                color="blue.500"
                aria-label="Call Sage"
                fontSize="20px"
                isDisabled={pageIndex === "1"}
                onClick={() =>
                  handleChangePageIndex((parseInt(pageIndex) - 1).toString())
                }
              >
                <IoIosArrowBack />
              </IconButton>
              <IconButton
                variant="outline"
                color="blue.500"
                aria-label="Call Sage"
                fontSize="20px"
                isDisabled={data?.meta.last_page.toString() === pageIndex}
                onClick={() =>
                  handleChangePageIndex((parseInt(pageIndex) + 1).toString())
                }
              >
                <IoIosArrowForward />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <></>
  );
};

export default DataSample;
