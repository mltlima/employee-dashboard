'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
} from '@chakra-ui/react';

const EditEmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        department: '',
        hireDate: '',
    });
    const router = useRouter();
    const { id } = useParams();
    const toast = useToast();

    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setEmployee({
                        name: data.name,
                        position: data.position,
                        department: data.department,
                        hireDate: data.hireDate.split('T')[0], // Formatar para YYYY-MM-DD
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                toast({
                    title: 'Employee updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/');
            } else {
                toast({
                    title: 'Failed to update employee.',
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
            <Heading mb={5}>Edit Employee</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Position</FormLabel>
                        <Input
                            name="position"
                            value={employee.position}
                            onChange={handleChange}
                            placeholder="Position"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Department</FormLabel>
                        <Input
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            placeholder="Department"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Hire Date</FormLabel>
                        <Input
                            name="hireDate"
                            type="date"
                            value={employee.hireDate}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="lg" mt={4}>
                        Update Employee
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default function EditEmployee() {
    return <EditEmployeeForm />;
}
