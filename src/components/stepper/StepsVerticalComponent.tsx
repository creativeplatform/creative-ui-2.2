import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { ReactNode, FC } from 'react'

export const StepsComponent: FC<{
  steps: { label: string }[]
  children: ReactNode
}> = (props) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const bg = useColorModeValue('#F0F0F0', 'gray.900')

  return (
    <Flex flexDir="column" width="100%">
      <Steps
        checkIcon={FiCheckCircle}
        activeStep={activeStep}
        labelOrientation={'vertical'}
      >
        {props.steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Flex my={8} p={4} bg={bg} borderRadius={10}>
              {props.children[index]}
            </Flex>
          </Step>
        ))}
      </Steps>
      {activeStep === props.steps.length ? (
        <Flex p={4} bg={bg} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center" pb={4}>
            Let's Get The Party Started 💃🏻🕺🏾
          </Heading>
          <Button size="sm" onClick={reset}>Reset</Button>
{/*   TODO: ADD WINNER OF CAMPAIGN AND SHARE BUTTON TO LENSTER.XYZ HERE */}
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
            {activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepsComponent
