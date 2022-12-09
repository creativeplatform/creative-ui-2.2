import { useState } from 'react'
import { Box, GridItem, useToast } from '@chakra-ui/react'
import BucketCard from '../components/common/Cards/BucketCard'
import { Button } from '@chakra-ui/react'
import { TextileInstance } from '../services/textile/textile'
import BatchStorage from '../components/common/Button/batchStorage'
import { providers } from 'ethers'
import { init } from '@textile/eth-storage'
import { NFTMetadata } from 'src/services/textile/types'

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider }
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition
  constructor(public value?: Type) {}
}

export default function All() {
  const [displayPix, setDisplayPix] = useState(false)
  const [photos, setPhotos] = useState<NFTMetadata[]>([])
  const toast = useToast()

  const fetchGallery = async () => {
    const textileInstance = await TextileInstance.getInstance()
    const photos = await textileInstance.getAllUserNFTs()

    setPhotos(photos)

    if (photos.length === 0) {
      toast({
        title: 'No photos',
        status: 'info',
        description: 'No photos have been uploaded yet.',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    setDisplayPix(true)
    // console.log(photos);

    // console.log(photos);
    // console.log(cid);
  }

  const batchStorage = async () => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    const textileInstance = await TextileInstance.getInstance()

    if ((await storage.hasDeposit()) && photos.length > 0) {
      await Promise.all(
        photos.map((nftMetadata) =>
          textileInstance.uploadTokenMetadata(storage, nftMetadata)
        )
      )
    } else if (photos.length > 0) {
      await storage.addDeposit()
      await Promise.all(
        photos.map((nftMetadata) =>
          textileInstance.uploadTokenMetadata(storage, nftMetadata)
        )
      )
    }
  }

  const OneItemStorage = async (nftMetadata) => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    const textileInstance = await TextileInstance.getInstance()

    if (await storage.hasDeposit()) {
      await textileInstance.uploadTokenMetadata(storage, nftMetadata)
    } else {
      await storage.addDeposit()
      await textileInstance.uploadTokenMetadata(storage, nftMetadata)
    }
  }

  const releaseFund = async () => {
    const provider = new providers.Web3Provider(
      (window as WindowInstanceWithEthereum).ethereum
    )
    const storage = await init(provider.getSigner())
    await storage.releaseDeposits()
  }

  return (
    <Box
      display="flex"
      flexDir={['column', 'column', 'column', 'column']}
      flexWrap={['wrap', 'wrap', 'wrap', 'wrap']}
    >
      <Box
        display="flex"
        flexDir={['column', 'column', 'row', 'row']}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        justifyContent="space-evenly"
        flexWrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
        mb={12}
      >
        <Button colorScheme="blue" onClick={fetchGallery} hidden={displayPix}>
          Fetch my photos
        </Button>
        <BatchStorage onClick={batchStorage}></BatchStorage>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={[
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
        ]}
        gap={5}
      >
        {photos.map((photo, index) => (
          <GridItem key={index} overflow="hidden">
            <BucketCard photo={photo} />
          </GridItem>
        ))}
      </Box>
    </Box>
  )
}
