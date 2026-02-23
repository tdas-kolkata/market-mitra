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
        <h1 className="font-bold text-3xl p-2 text-center">
          {" "}
          Mean-Variance Analysis Of Indian Equity Market
        </h1>
      </div>
      <div className="mt-0">
        <RiskReturnChart data={transformRiskReturnData(risk_reward_data)} />
      </div>
      <div className="my-10 py-10 px-10 lg:px-30 text-xl">
        Here is the Single-stock Mean-Variance Analysis (
        <a
          href="https://en.wikipedia.org/wiki/Markowitz_model"
          className="text-blue-400 hover:underline"
        >
          Markowitz model
        </a>
        ) which is the foundational process of evaluating an individual security
        based on its expected return (the mean) and its risk (the variance or
        standard deviation) applied in context of the Indian Equity space. Being
        associated with{" "}
        <a
          href="https://en.wikipedia.org/wiki/Modern_portfolio_theory"
          className="text-blue-400 hover:underline"
        >
          Modetn Portfolio Theory
        </a>{" "}
        applying it to a single stock helps an investor understand the
        asset&apos;s risk-reward profile in isolation. Indian equity space (NSE)
        has 2,671 listed companies and out of them top 500 companies claims the
        92% of the entire free float market capitalisation therefore analysing
        the top 500 companies helps to identify the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Efficient_frontier"
          className="text-blue-400 hover:underline"
        >
          Efficient Frontier
        </a>{" "}
        which helps investors to construct efficient portfolio. Platform
        extracts the daily pricing data for the 500 companies and provides the
        latest stats over the scatter plot.
      </div>
      <footer>
        <div className="w-ful py-8 flex justify-center border">
          <a href="/creator" className="text-blue-400 hover:underline">
            About Me
          </a>
        </div>
      </footer>
    </main>
  );
}
