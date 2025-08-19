import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30,
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
  },
  normal: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  normalBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  link: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  button: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  button:{
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default globalStyles;