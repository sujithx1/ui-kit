import {
  Badge,
  Avatar,
  HStack,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ReusableTable, type Column } from "./components/table/Table";
import { LuPencil, LuTrash } from "react-icons/lu";

type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: string;
  salary: number;
};

const users: User[] = [
  { id: 1, name: "Sujith C", email: "sujith@gmail.com", status: "active", role: "Frontend Dev", salary: 85000 },
  { id: 2, name: "Arun Kumar", email: "arun@gmail.com", status: "inactive", role: "Backend Dev", salary: 92000 },
  { id: 3, name: "Meera Nair", email: "meera@gmail.com", status: "pending", role: "UI Designer", salary: 67000 },
  { id: 4, name: "Rahul Das", email: "rahul@gmail.com", status: "active", role: "DevOps", salary: 110000 },
  { id: 5, name: "Anjali Menon", email: "anjali@gmail.com", status: "active", role: "QA Engineer", salary: 72000 },
  { id: 6, name: "Vikram S", email: "vikram@gmail.com", status: "inactive", role: "Product Manager", salary: 130000 },
  { id: 7, name: "Nithin Raj", email: "nithin@gmail.com", status: "pending", role: "Support", salary: 54000 },
  { id: 8, name: "Sneha P", email: "sneha@gmail.com", status: "active", role: "HR", salary: 60000 },
  { id: 9, name: "Aditya Rao", email: "aditya@gmail.com", status: "active", role: "Fullstack Dev", salary: 98000 },
  { id: 10, name: "Priya Sharma", email: "priya@gmail.com", status: "inactive", role: "Marketing", salary: 75000 },
  { id: 11, name: "Kiran B", email: "kiran@gmail.com", status: "active", role: "Security", salary: 115000 },
  { id: 12, name: "Deepak V", email: "deepak@gmail.com", status: "pending", role: "Intern", salary: 25000 },
  { id: 13, name: "Fathima K", email: "fathima@gmail.com", status: "active", role: "Designer", salary: 69000 },
  { id: 14, name: "Rohit P", email: "rohit@gmail.com", status: "inactive", role: "Data Analyst", salary: 88000 },
  { id: 15, name: "Akhil M", email: "akhil@gmail.com", status: "active", role: "Mobile Dev", salary: 91000 },
  { id: 16, name: "Neha T", email: "neha@gmail.com", status: "pending", role: "QA", salary: 64000 },
  { id: 17, name: "Sandeep R", email: "sandeep@gmail.com", status: "active", role: "Architect", salary: 150000 },
  { id: 18, name: "Divya S", email: "divya@gmail.com", status: "inactive", role: "HR", salary: 58000 },
  { id: 19, name: "Manoj K", email: "manoj@gmail.com", status: "active", role: "Backend Dev", salary: 99000 },
  { id: 20, name: "Reshma P", email: "reshma@gmail.com", status: "pending", role: "Support", salary: 52000 },
];

export default function UsersPage() {
  const columns: Column<User>[] = [
    {
      header: "User",
      accessor: "name",
      render: (_, row) => (
        <HStack gap={3}>
          {/* <Avatar size="sm" name={row.name} /> */}
          <Text fontWeight="medium">{row.name}</Text>
        </HStack>
      ),
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Salary",
      accessor: "salary",
      isNumeric: true,
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: User["status"]) => {
        const color =
          value === "active"
            ? "green"
            : value === "pending"
            ? "yellow"
            : "red";

        return <Badge colorScheme={color}>{value}</Badge>;
      },
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_, row) => (
        <HStack gap={2}>
          <IconButton
            aria-label="edit"
            size="sm"
            variant="ghost"
            onClick={() => console.log("Edit", row)}
          >
            <LuPencil />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="sm"
            colorPalette="red"
            variant="ghost"
            onClick={() => console.log("Delete", row)}
          >
            <LuTrash />
          </IconButton>
          <Button
            size="xs"
            colorPalette="blue"
            onClick={() => console.log("View", row)}
          >
            View
          </Button>
        </HStack>
      ),
    },
  ];

  return (
    <ReusableTable
      columns={columns}
      data={users}
      isLoading={false}
      height="500px"
    />
  );
}