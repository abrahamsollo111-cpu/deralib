import { estConnecte, authConfiguree } from "@/lib/auth";
import { stockagePersistant } from "@/lib/store";
import Connexion from "./Connexion";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const connecte = await estConnecte();

  if (!connecte) {
    return <Connexion configure={authConfiguree()} />;
  }
  return <Dashboard stockagePersistant={stockagePersistant} />;
}
