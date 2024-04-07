const URL = import.meta.env.VITE_BASE_URL;

export const fetchUserInfo = async (firebaseUser) => {
  try {
    const token = await firebaseUser.getIdToken();

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

    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
