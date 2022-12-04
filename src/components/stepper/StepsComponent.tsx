import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react'
import Lorem from 'react-lorem-component';
import { CountDown } from '../../components/common/CountDown'
import { FiCheckCircle } from "react-icons/fi"

const steps = [
  {
    label: 'Submission Deadline',
    props: {
      time: '12/10/2022',
      tooltip: 'lorem ipsum',
    },
  },
  {
    label: 'Voting Deadline',
    props: {
      time: '12/6/2022',
      tooltip: 'lorem ipsum',
    },
  },
  {
    label: 'Decision Deadline',
    props: {
      time: '12/4/2022',
      tooltip: 'lorem ipsum',
    },
  },
]

export const StepsComponent = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const bg = useColorModeValue('#F0F0F0', 'gray.900')

  return (
    <Flex flexDir="column" width="100%">
      <Steps checkIcon={FiCheckCircle} activeStep={activeStep} labelOrientation={"horizontal"}>
        {steps.map(({ label, props }, index) => (
          <Step label={label} key={label}>
            <Flex my={4} p={4} bg={bg} borderRadius={10}>
              <CountDown title="Deadline" {...props} />
            </Flex>
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepsComponent