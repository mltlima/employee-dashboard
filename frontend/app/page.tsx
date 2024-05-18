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
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
}

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (column: keyof Employee) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== _id));
        toast({
          title: 'Employee deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Failed to delete employee.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
              <Th onClick={() => handleSort('name')} cursor="pointer">
                Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </Th>
              <Th onClick={() => handleSort('position')} cursor="pointer">
                Position {sortColumn === 'position' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </Th>
              <Th onClick={() => handleSort('department')} cursor="pointer">
                Department {sortColumn === 'department' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </Th>
              <Th onClick={() => handleSort('hireDate')} cursor="pointer">
                Hire Date {sortColumn === 'hireDate' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.map((employee) => (
              <Tr key={employee._id}>
                <Td>{employee.name}</Td>
                <Td>{employee.position}</Td>
                <Td>{employee.department}</Td>
                <Td>{new Date(employee.hireDate).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    onClick={() => router.push(`/edit/${employee._id}`)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default function Home() {
  return <EmployeeTable />;
}
