import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { signInWithGoogle } from "@/services/googleAuth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithGoogle();

      // AuthContext detects the Firebase authentication change.
      // Expo Router will automatically open the dashboard.
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Branding */}
        <View style={styles.brandContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>HB+</Text>
          </View>
          <Text style={styles.brandName}>HB+ Workspace</Text>
        </View>

        {/* Welcome section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.heading}>Welcome back!</Text>

          <Text style={styles.description}>
            Sign in with your official HB+ account to access your workspace.
          </Text>
        </View>

        {/* Login card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get started</Text>

          <Text style={styles.cardDescription}>
            Continue with your HB+ Google account.
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.buttonPressed,
              loading && styles.disabledButton,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#172B4D" />
            ) : (
              <>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.note}>
            Only verified @hbplus.fit accounts are allowed.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Secure access powered by Google Authentication
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 64,
    height: 64,
    backgroundColor: "#172B4D",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },
  brandName: {
    color: "#172B4D",
    fontSize: 18,
    fontWeight: "700",
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#172B4D",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#667085",
    lineHeight: 23,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#667085",
    marginBottom: 24,
  },
  googleButton: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9DEE7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  googleIcon: {
    fontSize: 21,
    fontWeight: "800",
    color: "#4285F4",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172B4D",
  },
  buttonPressed: {
    backgroundColor: "#F2F4F7",
  },
  disabledButton: {
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: {
    color: "#B42318",
    fontSize: 13,
    lineHeight: 19,
  },
  note: {
    fontSize: 12,
    color: "#98A2B3",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  footer: {
    color: "#98A2B3",
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
});
