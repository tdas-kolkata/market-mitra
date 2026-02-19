import {RiskReturnDataInterface, transformRiskReturnData} from "@/interfaces/risk_return_data_interface"
import dotenv from 'dotenv';
import path from 'path';
import RiskReturnChart from "@/components/plots/risk_return_plot"

// Point this to your actual relative path
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import postgres from 'postgres';
const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL not found. Check the path in lib/db.ts");
}

// 2. Create the SQL client
const sql = postgres(connectionString, {
  idle_timeout: 20,
  max: 10,
});




const risk_reward_data = await sql<RiskReturnDataInterface[]>`
    SELECT * from risk_return_view
  `;

// console.log(transformRiskReturnData(risk_reward_data))


export default function Home() {
  return (
    <main className="overflow-auto bg-zinc-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 h-screen">
      <div>
        <h1 className='font-bold text-3xl p-4 text-center'>Risk Return Plot</h1>
      </div>
      <div className="mt-20">
        <RiskReturnChart data={transformRiskReturnData(risk_reward_data)}/>
      </div>
    </main>
  );
}
