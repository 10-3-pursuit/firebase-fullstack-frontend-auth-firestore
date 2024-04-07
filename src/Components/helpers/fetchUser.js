const URL = import.meta.env.VITE_BASE_URL;

export const fetchUserInfo = async (firebaseUser) => {
  console.log("firebaseUser", firebaseUser.uid);
  try {
    const token = await firebaseUser.getIdToken();
    console.log("gotTogken", token);
    const response = await fetch(`${URL}/api/auth/user/${firebaseUser.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    const user = await response.json();
    console.log("fetchUdr", user);
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
