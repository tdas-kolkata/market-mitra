export const dynamic = "force-dynamic";
import {
  RiskReturnDataInterface,
  transformRiskReturnData,
} from "@/interfaces/risk_return_data_interface";
import dotenv from "dotenv";
import path from "path";
import RiskReturnChart from "@/components/plots/risk_return_plot";

// Point this to your actual relative path
if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
}

import postgres from "postgres";
const connectionString = process.env.DB_URL || "";

if (!connectionString) {
  if (process.env.NODE_ENV === "production") {
    // In production RUNTIME, we definitely need it
    console.warn(
      "⚠️ DB_URL is missing. If this is the build phase, ignore. If this is production, the app will fail.",
    );
  }
}


export default async function Home() {
  const sql = postgres(connectionString, {
    idle_timeout: 20,
    max: 10,
  });

  const risk_reward_data = await sql<RiskReturnDataInterface[]>`
    SELECT * from risk_return_view
  `;
  return (
    <main className="overflow-auto bg-zinc-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 h-screen">
      <div>
        <h1 className="font-bold text-3xl p-4 text-center">Risk Return Plot</h1>
      </div>
      <div className="mt-20">
        <RiskReturnChart data={transformRiskReturnData(risk_reward_data)} />
      </div>
    </main>
  );
}
