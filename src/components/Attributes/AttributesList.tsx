import { HStack, Stack, Flex, Badge } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import React from 'react'

function AttributeList({ attributes, deleteAttribute }) {
  if (!attributes.length) {
    return (
      <Badge colorScheme="pink" variant="outline" borderRadius="4" p="4" m="5">
        No attributes for this NFT!!
      </Badge>
    )
  }

  return (
    <Stack direction={['column', 'row']} spacing="24px">
      {attributes.map((attribute) => (
        <HStack key={attribute.id} spacing="auto" w="sm">
          <Flex>
            <Badge colorScheme="purple" variant="outline" borderRadius="sm">
              {attribute.property}: {attribute.text}
            </Badge>

            <Flex w="10px">
              <DeleteIcon
                color="red.500"
                mr="2"
                onClick={() => deleteAttribute(attribute.id)}
              />
            </Flex>
          </Flex>
        </HStack>
      ))}
    </Stack>
  )
}
export default AttributeList
