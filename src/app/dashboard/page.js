import ProtectedRoute from "@/components/auth/ProtectedRoute.js";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
