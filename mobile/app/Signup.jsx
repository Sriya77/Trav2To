import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const Signup = () => {
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = () => {
    setError({
      name: false,
      email: false,
      phone: false,
      password: false,
      confirmPassword: false,
    });

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError({
        name: !name,
        email: !email,
        phone: !phone,
        password: !password,
        confirmPassword: !confirmPassword,
      });
      return;
    }

    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    Alert.alert("Success", "Account created successfully!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  const getInputStyle = (field) => [
    styles.input,
    error[field] && styles.errorInput,
    focusedInput === field && styles.focusedInput,
  ];

  return (
    <LinearGradient
      colors={["#BFDBFE", "#DDD6FE", "#FBCFE8"]}
      style={styles.container}
    >
      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <Animated.View entering={FadeIn.delay(200)}>
          <TextInput
            style={getInputStyle("name")}
            placeholder="Full Name"
            value={name}
            onFocus={() => setFocusedInput("name")}
            onBlur={() => setFocusedInput(null)}
            onChangeText={setName}
          />
          {error.name && <Text style={styles.errorText}>Enter a valid name</Text>}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300)}>
          <TextInput
            style={getInputStyle("email")}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            onChangeText={setEmail}
          />
          {error.email && <Text style={styles.errorText}>Enter a valid email</Text>}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400)}>
          <TextInput
            style={getInputStyle("phone")}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onFocus={() => setFocusedInput("phone")}
            onBlur={() => setFocusedInput(null)}
            onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
          />
          {error.phone && <Text style={styles.errorText}>Enter a valid phone number</Text>}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(500)}>
          <TextInput
            style={getInputStyle("password")}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            onChangeText={setPassword}
          />
          {error.password && <Text style={styles.errorText}>Enter a valid password</Text>}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600)}>
          <TextInput
            style={getInputStyle("confirmPassword")}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
            onChangeText={setConfirmPassword}
          />
          {error.confirmPassword && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(700)} style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Already have an account? Login here.
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
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
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },
  focusedInput: {
    borderColor: "#4f46e5",
  },
  errorInput: {
    borderColor: "#f87171",
  },
  errorText: {
    color: "#f87171",
    marginBottom: 10,
    fontSize: 12,
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
  linkText: {
    marginTop: 15,
    textAlign: "center",
    color: "#4f46e5",
  },
});

export default Signup;
