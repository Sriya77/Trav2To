import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  const navigation = useNavigation();

  const handleSubmit = () => {
    setError({ email: false, password: false });
    if (!email || !password) {
      setError({ email: !email, password: !password });
      return;
    }

    console.log({ email, password });
    // navigation.navigate('Home'); // Uncomment this if you want to redirect
  };

  return (
    <LinearGradient
      colors={["#BFDBFE", "#DDD6FE", "#FBCFE8"]}
      style={styles.container}
    >
      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <Animated.View entering={FadeIn.delay(200)}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, error.email && styles.errorInput]}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error.email && <Text style={styles.errorText}>Enter a valid email</Text>}
        </Animated.View>

        {/* Password Input */}
        <Animated.View entering={FadeIn.delay(300)} style={{ marginTop: 15 }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, error.password && styles.errorInput]}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          {error.password && (
            <Text style={styles.errorText}>Enter a valid password</Text>
          )}
        </Animated.View>

        {/* Submit Button */}
        <Animated.View entering={FadeIn.delay(400)} style={{ marginTop: 25 }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  errorInput: {
    borderColor: "#F87171",
  },
  errorText: {
    color: "#F87171",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Login;
