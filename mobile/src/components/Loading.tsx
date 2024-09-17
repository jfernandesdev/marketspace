import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center flex={1} bg="$gray200">
      <Spinner color="$brand500" size="large" />
    </Center>
  )
}