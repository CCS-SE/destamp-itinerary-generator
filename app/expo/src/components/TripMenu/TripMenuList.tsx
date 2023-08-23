import { useState } from "react";
import { FlatList } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import TripMenuItem from "./TripMenuItem";

interface TripMenuListProps {
  onCloseModal: () => void;
  item?: TripMenu;
}

function TripMenuList({ onCloseModal }: TripMenuListProps) {
  const [tripMenu] = useState<TripMenu[]>(tripMenus);

  return (
    <FlatList
      data={tripMenu}
      renderItem={({ item }) => (
        <TripMenuItem onCloseModal={onCloseModal} item={item} />
      )}
      scrollEnabled={false}
    />
  );
}

interface TripMenu {
  icon: any;
  title: string;
  color: string;
}

const tripMenus: TripMenu[] = [
  {
    icon: <Ionicons name="information-circle-outline" size={26} />,
    title: "View trip details",
    color: "#000",
  },
  {
    icon: <Ionicons name="share-outline" size={24} />,
    title: "Share trip",
    color: "#000",
  },
  {
    icon: <Feather name="repeat" size={21.5} />,
    title: "Regenerate trip",
    color: "#000",
  },
  {
    icon: <AntDesign name="delete" color={"#F00"} size={22} />,
    title: "Delete trip",
    color: "#F00",
  },
];

export default TripMenuList;