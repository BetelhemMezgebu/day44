import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return null;
  }

  if (sessionId === "demo-user-1") {
    return {
      userId: "demo-user-1",
      email: "user@example.com",
      role: "user",
    };
  }

  if (sessionId === "demo-staff-1") {
    return {
      userId: "demo-staff-1",
      email: "staff@example.com",
      role: "staff",
    };
  }

  return null;
}
