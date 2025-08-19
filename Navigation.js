import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Iconos
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Importaciones de React Native
import { Text, Image } from 'react-native';
import HomeScreen from "./src/screens/home/HomeScreen";

//Stacks
const Stack = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();

//Button Tabs
const Tab = createBottomTabNavigator();


function MyStackPrincipal() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#000", // Color del texto del header
        headerStyle: {
          backgroundColor: "#FFF", // Color de fondo del header
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={TabsNavigator}
        options={{
          headerShown: false,
          title: "", // Título vacío
        }}
      />
    </Stack.Navigator>
  );
}


function MyStackHome() {

  return (
    <StackHome.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        headerTintColor: "#000", // Color del texto del header
        headerStyle: {
          backgroundColor: "#FFF", // Color de fondo del header
        },
      }}
    >
      <StackHome.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "Task App", // Título vacío
          headerTintColor: "#000", // Color del texto o íconos del header
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold", // Fuente personalizada
            fontSize: 25, // Tamaño de fuente (opcional)
          },
          headerLeft: () => (
            <Image
              source={require('./assets/icon.png')} // Asegúrate de que la ruta sea correcta
              style={{ width: 35, resizeMode: 'contain', height: 35, marginRight: 10 }} // Cambiado "with" a "width"
            />
          ),
        }}
      />
    </StackHome.Navigator>
  );
}


function TabsNavigator() {


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#FFF", height: 120, },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={MyStackHome}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontFamily: "Poppins_600SemiBold", fontSize: 13, marginTop: 5 }}>
              Inicio
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStackPrincipal />
    </NavigationContainer>
  );
}