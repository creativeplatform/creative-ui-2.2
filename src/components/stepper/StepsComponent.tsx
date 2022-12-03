import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Button, Heading } from '@chakra-ui/react'
import Lorem from 'react-lorem-component';
import { CountDown } from '../../components/common/CountDown'
import { FiCheckCircle } from "react-icons/fi"

// const content = (
//   <Flex py={4}>
//     <CountDown
//     title="Voting Ends"
//     time={props.voting}
//     tooltip="lorem ipsum"
//     />
//   </Flex>
// );

const steps = [{ label: "Submission Deadline" }, { label: "Voting Deadline" }, { label: "Decision Deadline" }]

export const StepsComponent = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  return (
    <Flex flexDir="column" width="100%">
      <Steps checkIcon={FiCheckCircle} activeStep={activeStep} labelOrientation={"horizontal"}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            {/* {content} */}
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