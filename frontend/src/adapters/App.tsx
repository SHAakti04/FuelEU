import RoutesPage from "./ui/pages/RoutesPage";
import ComparePage from "./ui/pages/ComparePage";
import BankingPage from "./ui/pages/BankingPage";
import PoolingPage from "./ui/pages/PoolingPage";

export default function App() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">FuelEU Maritime</h1>
      <RoutesPage />
      <ComparePage />
      <BankingPage />
      <PoolingPage />
    </div>
  );
}
