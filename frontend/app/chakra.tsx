'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export function Chakra({ children }: Props) {
    return <ChakraProvider>{children}</ChakraProvider>;
}
