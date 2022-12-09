import React from 'react'
import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'
import UploadNftForm from 'src/components/forms/UploadNftForm'

class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const Upload = () => {
  return (
    <Box bg={useColorModeValue('gray.200', 'inherit')} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading
                fontSize="lg"
                fontWeight="md"
                lineHeight="6"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Upload NFT
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                This information will be displayed publicly so be careful what
                you share.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <UploadNftForm />
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Upload
