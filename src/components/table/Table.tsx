import {
  Table,
  Spinner,
  Center,
  Text,
  Box,
  HStack,
  Skeleton,
  VStack,
  IconButton,
  Input,
  InputGroup,
  InputElement,
  Select,
  Badge,
} from "@chakra-ui/react";
import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import React, { useMemo, useState } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  isNumeric?: boolean;
  width?: string | number;
};

type PaginationType = "client" | "server";

type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  height?: string | number;

  // pagination
  paginationType?: PaginationType;
  totalCount?: number; // for server
  page?: number; // for server
  pageSize?: number;
  onPageChange?: (page: number) => void;

  // features
  enableSearch?: boolean;
  title?: string;
};

export function ReusableTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found",
  height = "420px",
  paginationType = "client",
  totalCount,
  page: serverPage = 1,
  pageSize = 5,
  onPageChange,
  enableSearch = true,
  title = "Data",
}: ReusableTableProps<T>) {
  const [search, setSearch] = useState("");
  const [clientPage, setClientPage] = useState(1);

  const page = paginationType === "client" ? clientPage : serverPage;

  // 🔍 client search
  const filteredData = useMemo(() => {
    if (!enableSearch || !search) return data;

    return data.filter((row) =>
      Object.values(row as any).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, enableSearch]);

  // 📄 client pagination
  const paginatedData = useMemo(() => {
    if (paginationType === "server") return filteredData;

    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize, paginationType]);

  const total = paginationType === "server" ? totalCount ?? 0 : filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePrev = () => {
    if (page <= 1) return;
    if (paginationType === "client") setClientPage(page - 1);
    else onPageChange?.(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;
    if (paginationType === "client") setClientPage(page + 1);
    else onPageChange?.(page + 1);
  };

  // 🔥 Skeleton loading
  if (isLoading) {
    return (
      <VStack gap={3} py={10}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="48px" borderRadius="lg" w="100%" />
        ))}
      </VStack>
    );
  }

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: "gray.900" }}
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 20px 45px rgba(0,0,0,0.05)"
    >
      {/* 🔥 Toolbar */}
      <HStack
        px={5}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.100"
        _dark={{ borderColor: "whiteAlpha.200" }}
        justify="space-between"
        flexWrap="wrap"
        gap={3}
      >
        <Text fontWeight="semibold" fontSize="sm">
          {title}
        </Text>

      
        {/* {enableSearch && (
          <InputGroup maxW="260px" size="sm">
            <Input
              placeholder="Search..."
              ps="8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.50"
              borderRadius="lg"
            />
            <InputElement placement="start" pointerEvents="none">
              <LuSearch size={16} />
            </InputElement>
          </InputGroup>
        )} */}
      </HStack>

      {/* 📭 Empty */}
      {!paginatedData.length ? (
        <Center py={20}>
          <Text color="gray.400" fontSize="sm" fontWeight="medium">
            {emptyMessage}
          </Text>
        </Center>
      ) : (
        <>
          {/* 📊 Table */}
          <Box overflow="auto" maxH={height}>
            <Table.Root size="sm">
              <Table.Header
                position="sticky"
                top={0}
                zIndex={2}
                bg="gray.50"
                _dark={{ bg: "gray.800" }}
              >
                <Table.Row>
                  {columns.map((col, index) => (
                    <Table.ColumnHeader
                      key={index}
                      textAlign={col.isNumeric ? "end" : "start"}
                      fontSize="11px"
                      textTransform="uppercase"
                      letterSpacing="0.08em"
                      fontWeight="700"
                      color="gray.500"
                      py={3}
                      px={5}
                      w={col.width}
                      borderBottom="1px solid"
                      borderColor="gray.200"
                    >
                      {col.header}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {paginatedData.map((row, rowIndex) => (
                  <Table.Row
                    key={rowIndex}
                    _hover={{
                      bg: "gray.50",
                      _dark: { bg: "whiteAlpha.100" },
                    }}
                    transition="background 0.18s ease"
                  >
                    {columns.map((col, colIndex) => {
                      const value = row[col.accessor];

                      return (
                        <Table.Cell
                          key={colIndex}
                          textAlign={col.isNumeric ? "end" : "start"}
                          py={3.5}
                          px={5}
                          borderBottom="1px solid"
                          borderColor="gray.100"
                          _dark={{ borderColor: "whiteAlpha.200" }}
                        >
                          {col.render ? (
                            col.render(value, row)
                          ) : typeof value === "boolean" ? (
                            <Badge colorPalette={value ? "green" : "red"}>
                              {value ? "Active" : "Inactive"}
                            </Badge>
                          ) : (
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              _dark={{ color: "gray.200" }}
                            >
                              {String(value)}
                            </Text>
                          )}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* 🔢 Pagination */}
          <HStack
            justify="space-between"
            px={5}
            py={3}
            borderTop="1px solid"
            borderColor="gray.100"
            _dark={{ borderColor: "whiteAlpha.200" }}
          >
            <Text fontSize="xs" color="gray.500">
              Page {page} of {totalPages}
            </Text>

            <HStack>
              <IconButton
                aria-label="Previous"
                size="sm"
                variant="outline"
                onClick={handlePrev}
                disabled={page === 1}
              >
                <LuChevronLeft />
              </IconButton>

              <IconButton
                aria-label="Next"
                size="sm"
                variant="outline"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                <LuChevronRight />
              </IconButton>
            </HStack>
          </HStack>
        </>
      )}
    </Box>
  );
}
