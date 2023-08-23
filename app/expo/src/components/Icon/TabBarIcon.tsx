import SimpleLineIcon from "@expo/vector-icons/SimpleLineIcons";

interface TabBarIconProps {
  name: React.ComponentProps<typeof SimpleLineIcon>["name"];
  color: string;
  size: number;
}

export function TabBarIcon(props: TabBarIconProps) {
  return <SimpleLineIcon style={{ marginBottom: -3 }} {...props} />;
}
