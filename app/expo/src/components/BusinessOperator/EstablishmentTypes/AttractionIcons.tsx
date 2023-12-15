// import React, { useState } from 'react';
// import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

// import Arts from '../../../../assets/images/arts-perf.svg';
// import Landmark from '../../../../assets/images/landmark-perf.svg';
// import Museum from '../../../../assets/images/museum-pref.svg';
// import Outdoor from '../../../../assets/images/outdoor-perf.svg';
// import Shopping from '../../../../assets/images/shopping-perf.svg';
// import Sight from '../../../../assets/images/sight-perf.svg';

// interface ClickableIconProps {
//   onClick: () => void;
//   color: string;
//   icon: React.ReactNode;
//   title: string;
// }

// const ClickableIcon: React.FC<ClickableIconProps> = ({
//   onClick,
//   icon,
//   title,
// }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const handlePress = () => {
//     onClick();
//     setIsClicked(!isClicked);
//   };

//   const words = title.split(' ');
//   const firstWord = words[0];
//   const secondWord = words.slice(1).join(' ');

//   return (
//     <TouchableOpacity onPress={handlePress}>
//       <View
//         style={{
//           alignItems: 'center',
//           backgroundColor: 'white',
//           borderRadius: 10,
//           padding: 10,
//           width: 80,
//           shadowColor: isClicked ? 'transparent' : 'black',
//           shadowOffset: {
//             width: 5,
//             height: 5,
//           },
//           shadowOpacity: isClicked ? 1 : 0.5,
//           shadowRadius: 5,
//           elevation: 10,
//           borderWidth: 2,
//           borderColor: isClicked ? 'orange' : 'transparent',
//         }}
//       >
//         {icon}
//       </View>
//       <Text
//         style={{
//           fontFamily: 'Poppins',
//           textAlign: 'center',
//           marginTop: 5,
//           color: isClicked ? 'orange' : '#333',
//           fontSize: 10,
//         }}
//       >
//         {firstWord}
//         {secondWord && '\n'}
//         {secondWord}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// interface ActivitiesSelectionProps {
//   onActivitiesSliderValueChange: (name: string, value: number) => void;
//   initialActivityValues: { [key: string]: number };
// }

// export default function ActivitiesSelection({
//   onActivitiesSliderValueChange,
//   initialActivityValues,
// }: ActivitiesSelectionProps) {
//   const [activityValues, setActivityValues] = useState(initialActivityValues);

//   const handleSliderValueChange = (sliderName: string, newValue: number) => {
//     setActivityValues({ ...activityValues, [sliderName]: newValue });
//     onActivitiesSliderValueChange(sliderName, newValue);
//   };

//   const containerStyles: ViewStyle = {
//     marginTop: 10,
//     width: 320,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 40,
//     paddingRight: 40,
//     marginBottom: 10,
//   };

//   return (
//     <View>
//       <View style={containerStyles}>
//         {activities.map((activity, i) => (
//           <ClickableIcon
//             key={i}
//             onClick={() =>
//               handleSliderValueChange(
//                 activity.title,
//                 (activityValues[activity.title] as number) === 1 ? 0 : 1,
//               )
//             }
//             color={activity.color}
//             icon={activity.icon}
//             title={activity.title}
//           />
//         ))}
//       </View>
//       <View style={containerStyles}>
//         {activities1.map((activity, i) => (
//           <ClickableIcon
//             key={i}
//             onClick={() =>
//               handleSliderValueChange(
//                 activity.title,
//                 (activityValues[activity.title] as number) === 1 ? 0 : 1,
//               )
//             }
//             color={activity.color}
//             icon={activity.icon}
//             title={activity.title}
//           />
//         ))}
//       </View>
//       <View style={containerStyles}>
//         {activities2.map((activity, i) => (
//           <ClickableIcon
//             key={i}
//             onClick={() =>
//               handleSliderValueChange(
//                 activity.title,
//                 (activityValues[activity.title] as number) === 1 ? 0 : 1,
//               )
//             }
//             color={activity.color}
//             icon={activity.icon}
//             title={activity.title}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

// const activities = [
//   {
//     title: 'Sightseeing',
//     color: '#65F1D0',
//     icon: <Sight height={35} width={37} />,
//   },
//   {
//     title: 'Museum',
//     color: '#DFCCF1',
//     icon: <Museum height={35} width={37} />,
//   },
// ];

// const activities1 = [
//   {
//     title: 'Outdoor Activities',
//     color: '#FFCE98',
//     icon: <Outdoor height={35} width={37} />,
//   },
//   {
//     title: 'Arts',
//     color: '#EDF075',
//     icon: <Arts height={35} width={37} />,
//   },
// ];

// const activities2 = [
//   {
//     title: 'Shopping',
//     color: '#90DCFC',
//     icon: <Shopping height={35} width={37} />,
//   },
//   {
//     title: 'Architecture and Landmarks',
//     color: '#E997AB',
//     icon: <Landmark height={33} width={37} />,
//   },
// ];
