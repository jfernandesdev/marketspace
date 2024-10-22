import { Box, Divider, HStack, Icon, VStack, Text } from "@gluestack-ui/themed";
import { Bell } from "lucide-react-native";

type NotificationCardProps = {
  title: string;
  description: string;
  timestamp: string;
};

export function NotificationCard({ title, description, timestamp }: NotificationCardProps) {
  return (
    <VStack
      bg="$white"
      p="$4"
      rounded="$md"
      mb="$4"
      w="100%"
      borderColor="$gray100"
      borderWidth={1}
    >
      <HStack alignItems="center" space="md">
        <Box bg="$brand400" p="$3" rounded="$full">
          <Icon as={Bell} color="$white" size="md" />
        </Box>
        <VStack flex={1}>
          <Text fontWeight="bold" color="$gray900" fontSize="$md">
            {title}
          </Text>
          <Text color="$gray600" fontSize="$sm">
            {description}
          </Text>
        </VStack>
      </HStack>
      <Divider my="$2" />
      <HStack justifyContent="flex-end">
        <Text fontSize="$xs" color="$gray500">
          {timestamp}
        </Text>
      </HStack>
    </VStack>
  );
}