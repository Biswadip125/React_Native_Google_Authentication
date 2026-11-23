import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const initial = user?.displayName?.charAt(0).toUpperCase() || "U";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>HB+</Text>
          </View>

          <Pressable onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={styles.eyebrow}>YOUR WORKSPACE</Text>
          <Text style={styles.heading}>Welcome back,</Text>
          <Text style={styles.name}>{user?.displayName || "User"}!</Text>
          <Text style={styles.description}>
            You're successfully signed in to your HB+ account.
          </Text>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Account information</Text>

          <View style={styles.profileHeader}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            )}

            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{user?.displayName || "User"}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account status</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Verified</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Authentication</Text>
            <Text style={styles.infoValue}>Google</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>HB+ Workspace</Text>
          <Text style={styles.footerSubtext}>
            Securely connected to your account
          </Text>
        </View>
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
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    backgroundColor: "#172B4D",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E5EC",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: "#344054",
    fontWeight: "600",
    fontSize: 14,
  },
  welcome: {
    marginTop: 65,
    marginBottom: 32,
  },
  eyebrow: {
    color: "#16A36A",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  heading: {
    fontSize: 29,
    color: "#172B4D",
    fontWeight: "600",
  },
  name: {
    fontSize: 34,
    color: "#172B4D",
    fontWeight: "800",
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: "#667085",
    marginTop: 14,
    lineHeight: 23,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  avatarFallback: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E6F4ED",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 23,
    fontWeight: "700",
    color: "#168653",
  },
  profileDetails: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B4D",
  },
  userEmail: {
    color: "#667085",
    fontSize: 13,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#EAECF0",
    marginVertical: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  infoLabel: {
    color: "#667085",
    fontSize: 14,
  },
  infoValue: {
    color: "#344054",
    fontWeight: "600",
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#12B76A",
  },
  statusText: {
    color: "#027A48",
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 30,
  },
  footerText: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "700",
  },
  footerSubtext: {
    color: "#98A2B3",
    fontSize: 12,
    marginTop: 6,
  },
});
