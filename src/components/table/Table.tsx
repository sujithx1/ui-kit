import {
  Table,
  Spinner,
  Center,
  Text,
  Box,
  HStack,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  isNumeric?: boolean;
  width?: string | number;
};

type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  height?: string | number;
};

export function ReusableTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found",
  height = "420px",
}: ReusableTableProps<T>) {
  // 🔥 Skeleton loading (much better UX)
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
      {/* 🔥 Modern toolbar */}
      <HStack
        px={5}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.100"
        _dark={{ borderColor: "whiteAlpha.200" }}
        justify="space-between"
      >
        <Text fontWeight="semibold" fontSize="sm">
          Users
        </Text>
{/* <InputGroup maxW="240px" size="sm">
  <InputGroup.StartElement pointerEvents="none">
    <LuSearch size={16} />
  </InputGroup.StartElement>

  <Input placeholder="Search users..." ps="8" />
</InputGroup.Root> */}
      </HStack>

      {/* 📭 Empty state */}
      {!data.length ? (
        <Center py={20}>
          <Text color="gray.400" fontSize="sm" fontWeight="medium">
            {emptyMessage}
          </Text>
        </Center>
      ) : (
        <Box overflow="auto" maxH={height}>
          <Table.Root size="sm">
            {/* 🧊 Header */}
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

            {/* 📊 Body */}
            <Table.Body>
              {data.map((row, rowIndex) => (
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
      )}
    </Box>
  );
}