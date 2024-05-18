'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

export default function EditEmployee() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [hireDate, setHireDate] = useState('');
    const router = useRouter();
    const { id } = router.query;
    const toast = useToast();

    useEffect(() => {
        if (id) {
            fetch(`/api/employees/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setName(data.name);
                    setPosition(data.position);
                    setDepartment(data.department);
                    setHireDate(data.hireDate.split('T')[0]); // Formatar para YYYY-MM-DD
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const employee = { name, position, department, hireDate };

        try {
            const response = await fetch(`/api/employees/${id}`, {
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Position</FormLabel>
                        <Input
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Position"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Department</FormLabel>
                        <Input
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Department"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Hire Date</FormLabel>
                        <Input
                            type="date"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="lg" mt={4}>
                        Update Employee
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
