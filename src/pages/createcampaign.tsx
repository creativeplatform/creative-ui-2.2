import React, { Suspense, useEffect, useState } from 'react'
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Button,
  Select,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  InputRightAddon,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon, EmailIcon } from '@chakra-ui/icons'
import { useEthers } from '@usedapp/core'

import { useFormik } from 'formik'
import { ContractFactory, ethers, providers } from 'ethers'
import {
  CampaignMetadata,
  CampaignSettings,
  PoolMetadata,
} from '../services/textile/types'
import { TextileInstance } from '../services/textile/textile'
import StepsVerticalComponent from '../components/stepper/StepsVerticalComponent'
import CampaignForm from '../components/forms/CampaignForm'
import PoolForm from '../components/forms/PoolForm'
import NotificationForm from '../components/forms/NotificationForm'

export default function Component() {

  const { account, library } = useEthers()

  

  const campaignForm = useFormik({
    initialValues: {
      _id: '',
      name: '',
      brandName: '',
      brandWebsite: '',
      twitterAccount: '',
      campaignBrief: '',
      campaignImageURI: '',
      country: '',
      email: '',
      record: '0',
      videoCid: '',
      image: '',
      activePoolId: '',
      previousPools: [''],
      ownerAddress: '',
    },
    onSubmit: (values: CampaignMetadata) => {
      handleSaveCampaignDetails(values)
    },
  })

  const poolForm = useFormik({
    initialValues: {
      _id: '',
      poolAddress: '',
      filename: '',
      updatedAt: '',
      poolName: 'Your Product Name',
      capital: 7500,
      capitalAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      poolOwner: account,
      rngAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      nftAddress: '0xbd119CD9de78fAc6da57bA30506F02Ce854e3FE9',
      campaignLength: 1209600000,
      votingLength: 1209600000,
      decisionLength: 432000000,
      submissionLength: 432000000,
    },
    onSubmit: (values: PoolMetadata) => {
      // handleSavePoolDetails(values)
    },
  })

  const preferencesForm = useFormik({
    initialValues: {
      _id: '',
      campaignName: '',
      updatedAt: '',
      filename: '',
      email: [],
      push: '0',
    },
    onSubmit: (values: CampaignSettings) => {
      // handleSaveNotificationPreferences(values)
    },
  })

  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchCampaignAndPool = async () => {
      const textileInstance = await TextileInstance.getInstance()
      const userCampaign: CampaignMetadata | any =
        await textileInstance.getActiveUserCampaign()
      console.log({ userCampaign })
      if (userCampaign) {
        campaignForm.setValues(userCampaign)
        if (userCampaign.notificationPreferences) {
          preferencesForm.setValues(userCampaign.notificationPreferences)
        }
        console.log({
          preferences: preferencesForm.values,
          capaignPreferences: userCampaign.notificationPreferences,
        })
        if (userCampaign?.activePool) {
          const activePool = await textileInstance.getPoolById(
            userCampaign.activePool
          )
          poolForm.setValues(activePool)
          // setPoolDeployable(true) // PoolForm.tsx
        }
        console.log({
          campaign: campaignForm.values,
          preferences: preferencesForm.values,
          pool: poolForm.values,
        })
      }
    }
    fetchCampaignAndPool()
  }, [])

  const handleSaveCampaignDetails = async (values: CampaignMetadata) => {
    const textileInstance = await TextileInstance.getInstance()

    // const videoCid = await textileInstance.uploadLoomVideo(videoHTML);

    const campaignMetadata = await textileInstance.uploadCampaignMetadata(
      {
        ...values,
        record: values.record === '0' ? false : true,
      },
      files[0]
    )

    console.log(values)

    await textileInstance.addCampaign(campaignMetadata, account)

    campaignForm.setValues(campaignMetadata)
  }

  // const handleSavePoolDetails = async (values: PoolMetadata) => {
  //   const textileInstance = await TextileInstance.getInstance()

  //   const pool = {
  //     ...values,
  //   }

  //   const poolMetadata = await textileInstance.uploadPoolMetadata({
  //     poolAddress: poolForm.values.poolAddress
  //       ? poolForm.values.poolAddress
  //       : '',
  //     ...pool,
  //   })

  //   console.log({ poolMetadata })

  //   await textileInstance.uploadAndSetCampaignPool(
  //     campaignForm.values._id,
  //     poolMetadata
  //   )

  //   poolForm.setValues(poolMetadata)
  // } POOLFORM.TSX

  // const handleDeploy = async () => {
  //   const signer = await (library as providers.Web3Provider).getSigner()

  //   const pool = {
  //     ...poolForm.values,
  //   }

  //   const poolFactory = new ContractFactory(abi, bytecode, signer)

  //   console.log({ pool, poolFactory })

  //   const contract = await poolFactory.deploy(
  //     pool.poolName,
  //     campaignForm.values.name,
  //     ethers.BigNumber.from(pool.capital),
  //     ethers.utils.getAddress(pool.capitalAddress),
  //     ethers.utils.getAddress(pool.nftAddress),
  //     ethers.utils.getAddress(pool.poolOwner),
  //     ethers.utils.getAddress(pool.rngAddress),
  //     ethers.BigNumber.from(pool.campaignLength),
  //     ethers.BigNumber.from(pool.votingLength),
  //     ethers.BigNumber.from(pool.decisionLength),
  //     ethers.BigNumber.from(pool.submissionLength)
  //   )

  //   poolForm.values.poolAddress = contract.address
  // } POOLFORM.TSX

  // const handleSaveNotificationPreferences = async (
  //   values: CampaignSettings
  // ) => {
  //   const textileInstance = await TextileInstance.getInstance()

  //   // const preferenceMetadata =
  //   //     await textileInstance.uploadCampaignPreferences({
  //   //         ...values,
  //   //     });

  //   await textileInstance.setCampaignPreferences(
  //     campaignForm.values._id,
  //     values
  //   )
  // } // NOTIFICATIONFORM.TSX 

  // function EditableControls() {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls()

  //   return isEditing ? (
  //     <ButtonGroup justifyContent="center" size="sm">
  //       <IconButton
  //         aria-label="check"
  //         icon={<CheckIcon />}
  //         {...getSubmitButtonProps()}
  //       />
  //       <IconButton
  //         aria-label="close"
  //         icon={<CloseIcon />}
  //         {...getCancelButtonProps()}
  //       />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex justifyContent="left">
  //       <IconButton
  //         aria-label="edit"
  //         size="sm"
  //         icon={<EditIcon />}
  //         {...getEditButtonProps()}
  //       />
  //     </Flex>
  //   )
  // }

  return (
    <Suspense>
      <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
        <Text
          as="h1"
          fontSize="4xl"
          fontStyle="bold"
          mb={10}
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Create Campaign
        </Text>

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
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Create A New Campaign
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
              <form
                //ONSUBMIT CHECKPOINT
                method="POST"
                // shadow="base"
                // rounded={[null, "md"]}
                // overflow={{ sm: "hidden" }}
                onSubmit={campaignForm.handleSubmit}
              >
                <StepsVerticalComponent
                  steps={[
                    { label: 'Campaign 📜' },
                    { label: 'Settings ⚙️' },
                    { label: 'Notify 📟' },
                  ]}
                >
                  <CampaignForm />
                  <PoolForm />
                  <NotificationForm />
                </StepsVerticalComponent>
              </form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Suspense>
  )
}
