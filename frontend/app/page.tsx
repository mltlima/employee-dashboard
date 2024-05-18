'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Stack,
  Heading,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={5}>
      <Stack direction="row" justify="space-between" align="center" mb={5}>
        <Heading>Employee Dashboard</Heading>
        <Button onClick={() => router.push('/add')} colorScheme="teal">
          Add Employee
        </Button>
      </Stack>
      <Input
        placeholder="Search employees"
        value={search}
        onChange={handleSearch}
        mb={5}
      />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Department</Th>
              <Th>Hire Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.map((employee) => (
              <Tr key={employee.id}>
                <Td>{employee.name}</Td>
                <Td>{employee.position}</Td>
                <Td>{employee.department}</Td>
                <Td>{new Date(employee.hireDate).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    onClick={() => router.push(`/edit/${employee.id}`)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
