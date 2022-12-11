import { useEffect, useState } from 'react'
import { providers } from 'ethers'
import {
  Box,
  useColorModeValue,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  GridItem,
} from '@chakra-ui/react'
import {
  createLazyMint,
  generateTokenId,
} from '../../../rarible/createLazyMint'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Lock from '../Lock/lock'

// import { OpenSeaPort, Network } from 'opensea-js';

const myLoader = ({ src, width }) => {
  return `${src}?w=${width}&q=${75}`
}

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider }
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition
  constructor(public value?: Type) {}
}

export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const submitHandler = async () => {
  if (!(window as WindowInstanceWithEthereum).ethereum) {
    throw new Error(
      'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
    )
  }

  console.debug('Initializing web3 provider...')
  // @ts-ignore
  const provider = new providers.Web3Provider(
    (window as WindowInstanceWithEthereum).ethereum
  )

  // TODO: OpenSea Marketplace Function
  // const seaport = new OpenSeaPort(provider, {
  //   networkName: Network.Main
  // })

  const accounts = await (
    window as WindowInstanceWithEthereum
  ).ethereum.request({ method: 'eth_requestAccounts' })
  if (accounts.length === 0) {
    throw new Error(
      'No account is provided. Please provide an account to this application.'
    )
  }

  const address = new EthereumAddress(accounts[0])
  const contract = '0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05'
  const minter = address
  const ipfsHash = 'QmW5kGG6JPDv7oSVEfP8KTY9rsfQXCHpYJxvdRJrkkzbge'
  const tokenId = await generateTokenId(contract, minter)
  //console.log("Chain ID", chainId);
  const useCreateLazyMint = createLazyMint(
    tokenId,
    provider,
    contract,
    address.value,
    ipfsHash
  )
  console.log(await useCreateLazyMint)
}

const BucketCard = ({ photo, deleteMedia }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const blackAndWhite = useColorModeValue('black', 'white')
  const imagelink = `https://dweb.link/ipfs/${photo.cid}`

  useEffect(() => {
    setIsOpen(router.query['photo'] === photo._id)
  }, [])

  return (
    <>
      <Box
        cursor="pointer"
        role={'group'}
        overflow="hidden"
        width="full"
        height="auto"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        borderWidth="1px"
        rounded="lg"
        pos={'relative'}
        zIndex={0}
        onClick={() => {
          setIsOpen(true)
          router.push(
            router.asPath,
            { query: { photo: photo._id } },
            { shallow: true }
          )
        }}
      >
        <Box
          rounded={'lg'}
          pos={'relative'}
          height={['180px', '230px']}
          width="100%"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imagelink})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            loader={myLoader}
            layout="fill"
            objectFit={'cover'}
            src={imagelink}
          />
        </Box>
        <Stack
          p={4}
          align={'start'}
          color={useColorModeValue('black', 'white')}
        >
          <Text
            fontSize={'2xl'}
            fontFamily={'body'}
            fontWeight={500}
            w="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {photo.name}
          </Text>
          <Text
            fontSize={'sm'}
            w="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {photo.description}
          </Text>
        </Stack>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          router.push(router.asPath, { query: {} }, { shallow: true })
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="10px"
          maxW="1200px"
          maxHeight="90vh"
          w="100%"
          overflowY="auto"
          boxSizing="border-box"
          mx={8}
        >
          <ModalCloseButton color="white" />
          <ModalBody>
            <Flex
              color={blackAndWhite}
              gap={6}
              direction={['column', 'column', 'row']}
            >
              <Box
                height={['90vw', '90vw', '40vw']}
                width={['90vw', '90vw', '40vw']}
                maxWidth="min(740px, 100%)"
                maxHeight="min(740px, 100%)"
                rounded="lg"
                overflow="hidden"
                pos="relative"
                zIndex={0}
              >
                <Image
                  loader={myLoader}
                  layout="fill"
                  objectFit={'cover'}
                  src={imagelink}
                />
              </Box>
              <Flex direction="column" flex={1}>
                <Text
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  fontWeight={500}
                  w="100%"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {photo.name}
                </Text>
                <Text
                  fontSize={'sm'}
                  w="100%"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {photo.description}
                </Text>
                <Text
                  mt={4}
                  fontSize={'lg'}
                  fontFamily={'body'}
                  fontWeight={500}
                  w="100%"
                >
                  Attributes:
                </Text>
                <Box
                  display="grid"
                  gridTemplateColumns={[
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                  ]}
                  gap={2}
                >
                  {photo.attributes.map && photo.attributes.length ? (
                    photo.attributes.map((att) => (
                      <GridItem key={att.property}>
                        <Flex
                          direction="column"
                          alignItems="center"
                          border={`1px solid ${blackAndWhite}`}
                          rounded="md"
                          p={2}
                        >
                          <Text fontSize={'sm'}>{att.property}</Text>
                          <Text
                            fontSize={'lg'}
                            fontFamily={'body'}
                            fontWeight={500}
                          >
                            {att.text}
                          </Text>
                        </Flex>
                      </GridItem>
                    ))
                  ) : (
                    <Text fontSize={'sm'}>None</Text>
                  )}
                </Box>
                <Flex my={4} direction={'row'} gap={4}>
                  <Lock />
                </Flex>
                <Flex my={4} direction={'row'} gap={4}>
                  <Button
                    flex={1}
                    fontSize={'md'}
                    bg={'red.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'red.500',
                    }}
                    _focus={{
                      bg: 'red.500',
                    }}
                    isLoading={isDeleting}
                    onClick={() => {
                      setIsDeleting(true)
                      deleteMedia(photo)
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
                <Flex my={4} direction={'row'} gap={4}>
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={void null}
                  >
                    OpenSea Mint
                  </Button>
                  <Button
                    flex={1}
                    fontSize={'smaller'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={submitHandler}
                  >
                    Rarible Mint
                  </Button>
                </Flex>
                <Flex my={4} direction={'row'} gap={4}>
                  <Button
                    flex={1}
                    fontSize={'smaller'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={submitHandler}
                  >
                    Submit to Campaign
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BucketCard
