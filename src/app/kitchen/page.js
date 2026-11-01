import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import KitchenDashboard from "./KitchenDashboard";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="mt-3">Only kitchen staff can access this page.</p>
      </main>
    );
  }

  return <KitchenDashboard />;
}
