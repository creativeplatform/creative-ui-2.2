import React from "react";
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
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="check"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="left">
        <IconButton
          aria-label="edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    )
  }

export default function PoolForm(props) {
    return (
        <Box mt={[10, 0]}>
          <SimpleGrid
            display={{ base: 'initial', md: 'grid' }}
            columns={{ md: 3 }}
            spacing={{ md: 6 }}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading
                  fontSize="lg"
                  fontWeight="medium"
                  lineHeight="6"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Pool Information
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Details and Contact info for the pool.
                </Text>
              </Box>
            </GridItem>
            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
              <form
                method="POST"
                // shadow="base"
                onSubmit={props.handleSubmit}
                // rounded={[null, "md"]}
                // overflow={{ sm: "hidden" }}
              >
                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue('white', 'gray.700')}
                  spacing={6}
                >
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Pool name
                      </FormLabel>
                      <Editable
                        defaultValue={props.poolName}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="text"
                          value={props.poolName}
                          onChange={props.handleChange}
                          name="poolName"
                          id="poolName"
                          autoComplete="given-name"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Capital
                      </FormLabel>
                      <Editable
                        defaultValue={`${props.capital}`}
                        isPreviewFocusable={true}
                      >
                        <InputGroup>
                          <InputLeftAddon
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children="$"
                          />
                          <EditablePreview />
                          <Input
                            as={EditableInput}
                            type="number"
                            value={props.capital}
                            onChange={props.handleChange}
                            name="capital"
                            id="capital"
                            autoComplete="given-name"
                            focusBorderColor="brand.400"
                            w="full"
                            rounded="md"
                            color={useColorModeValue('gray.700', 'gray.50')}
                          />
                          <InputRightAddon children={<EditableControls />} />
                        </InputGroup>
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 4]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Capital Token Address
                      </FormLabel>
                      <Editable
                        defaultValue={props.capitalAddress}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="text"
                          value={props.capitalAddress}
                          onChange={props.handleChange}
                          name="capitalAddress"
                          id="capitalAddress"
                          autoComplete="given-name"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 4]}>
                      <FormLabel
                        htmlFor="nft_address"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        NFT address
                      </FormLabel>
                      <Editable
                        defaultValue={props.nftAddress}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="text"
                          value={props.nftAddress}
                          onChange={props.handleChange}
                          name="nftAddress"
                          id="nftAddress"
                          autoComplete="nft-address"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="poolOwner"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Pool Owner address
                      </FormLabel>
                      <Editable
                        defaultValue={props.account}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="text"
                          value={props.poolOwner}
                          onChange={props.handleChange}
                          name="poolOwner"
                          id="poolOwner"
                          autoComplete="pool-owner"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="nft_address"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        RNG address
                      </FormLabel>
                      <Editable
                        defaultValue={props.rngAddress}
                        isPreviewFocusable={false}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          isReadOnly
                          type="text"
                          value={props.rngAddress}
                          onChange={props.handleChange}
                          name="rngAddress"
                          id="rngAddress"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={6}>
                      <FormLabel
                        htmlFor="nft_address"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Campaign Length
                      </FormLabel>
                      <Editable
                        defaultValue={`${props.campaignLength}`}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="number"
                          value={props.campaignLength}
                          onChange={props.handleChange}
                          name="campaignLength"
                          id="campaignLength"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                      <FormLabel
                        htmlFor="voting_length"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Voting Length
                      </FormLabel>
                      <Editable
                        defaultValue={`${props.votingLength}`}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="number"
                          value={props.votingLength}
                          onChange={props.handleChange}
                          name="votingLength"
                          id="votingLength"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                      <FormLabel
                        htmlFor="decision_length"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Decision Length
                      </FormLabel>
                      <Editable
                        defaultValue={`${props.decisionLength}`}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="number"
                          value={props.decisionLength}
                          onChange={props.handleChange}
                          name="decisionLength"
                          id="decisionLength"
                          autoComplete="decision-length"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                      <FormLabel
                        htmlFor="submission_length"
                        fontSize="sm"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}
                      >
                        Submission Length
                      </FormLabel>
                      <Editable
                        defaultValue={`${props.submissionLength}`}
                        isPreviewFocusable={true}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          type="number"
                          value={props.submissionLength}
                          onChange={props.handleChange}
                          name="submissionLength"
                          id="submissionLength"
                          autoComplete="submission-length"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          color={useColorModeValue('gray.700', 'gray.50')}
                        />
                        <EditableControls />
                      </Editable>
                    </FormControl>
                  </SimpleGrid>
                </Stack>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={useColorModeValue('gray.50', 'gray.900')}
                  textAlign="right"
                >
                  <ButtonGroup>
                    <Button
                      type="submit"
                      colorScheme={'red'}
                      _focus={{ shadow: '' }}
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.800')}
                    >
                      Save
                    </Button>
                    <Button
                    //   isDisabled={poolDeployable}
                      colorScheme={'red'}
                      _focus={{ shadow: '' }}
                      fontWeight="md"
                    //   onClick={handleDeploy}
                      color={useColorModeValue('gray.700', 'gray.800')}
                    >
                      Deploy Campaign
                    </Button>
                  </ButtonGroup>
                </Box>
              </form>
            </GridItem>
          </SimpleGrid>
        </Box>
    )}