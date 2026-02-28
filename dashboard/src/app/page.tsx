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
    <main className="overflow-auto bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-l from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl dark:from-blue-600/10 dark:via-purple-600/10"></div>
        <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-linear-to-r from-purple-500/5 via-pink-500/5 to-transparent rounded-full blur-3xl dark:from-purple-600/10 dark:via-pink-600/10"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header Section */}
        <div className="px-4 pt-12 md:pt-16 pb-8 md:pb-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
              The Markowitz Model Analysis
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mx-auto max-w-2xl">
              Indian Equity Market Tracker
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-24 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Unified Content Container */}
        <div className="px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Chart Section - Integrated */}
            <div className="relative mb-0">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500 dark:opacity-25 dark:group-hover:opacity-40 -z-10"></div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 dark:border-gray-700/40">
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="w-full h-150 md:h-175 lg:h-200">
                    <RiskReturnChart
                      data={transformRiskReturnData(risk_reward_data)}
                    />
                  </div>
                </div>

                {/* Content Section - Seamlessly Integrated */}
                <div className="px-8 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        Understanding the Analysis
                      </h2>
                      <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg">
                              1
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                              The Markowitz model
                            </p>
                            <p>
                              The{" "}
                              <a
                                href="https://en.wikipedia.org/wiki/Markowitz_model"
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline transition"
                              >
                                Markowitz model
                              </a>{" "}
                              is the foundational process of evaluating an
                              individual security based on its expected return
                              (the mean) and its risk (the variance or standard
                              deviation) applied in context of the Indian Equity
                              space.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 text-white font-bold shadow-lg">
                              2
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                              Modern Portfolio Theory
                            </p>
                            <p>
                              Applied the {" "}
                              <a
                                href="https://en.wikipedia.org/wiki/Modern_portfolio_theory"
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline transition"
                              >
                                Modern Portfolio Theory 
                              </a>
                              {" "} to a single stock which helps
                              investors understand the asset&apos;s risk-reward
                              profile in isolation, enabling smarter investment
                              decisions.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 text-white font-bold shadow-lg">
                              3
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-pink-600 dark:text-pink-400 mb-2">
                              Market Coverage
                            </p>
                            <p>
                              The Indian equity space (NSE) has{" "}
                              <span className="font-bold">
                                2,671 listed companies
                              </span>
                              . The top 500 companies claim{" "}
                              <span className="font-bold">
                                92% of the entire free float market
                                capitalization
                              </span>
                              , making them critical for comprehensive portfolio
                              analysis and market insights.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-rose-500 to-orange-600 text-white font-bold shadow-lg">
                              4
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-rose-600 dark:text-rose-400 mb-2">
                              Identifying The Efficient Frontier
                            </p>
                            <p>
                              Analyzing the top 500 companies helps identify the{" "}
                              <a
                                href="https://en.wikipedia.org/wiki/Efficient_frontier"
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline transition"
                              >
                                Efficient Frontier
                              </a>
                              , enabling investors to construct optimally
                              diversified portfolios. Our platform extracts
                              daily pricing data and provides real-time
                              statistics in an interactive visualization.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 text-white font-bold shadow-lg">
                              5
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                              Portfolio Optimization
                            </p>
                            <p>
                              Disregarding the outlier points an Efficient Frontier can be drawn or imagined on the plot and the securities lying close to the line should be considered better options for portfolio construction.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-amber-500 to-yellow-600 text-white font-bold shadow-lg">
                              6
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                              Disclaimer
                            </p>
                            <p>
                              The Markowitz Model heavily depends on historical data, which may not reliably predict future market trends. Equity market investments are subject to high market risks, including the potential loss of principal, as security prices fluctuate based on economic and company-specific factors. Past performance does not guarantee future results. Investors should read all related documents carefully, consider their risk tolerance, and consult professional advisors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Seamlessly Integrated */}
            <div className="mt-12 md:mt-16">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-15 -z-10"></div>
                <div className="bg-linear-to-r from-white/60 to-blue-50/60 dark:from-gray-800/60 dark:to-gray-800/60 backdrop-blur-xl rounded-2xl py-8 px-6 md:px-8 border border-white/40 dark:border-gray-700/40 text-center shadow-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Want to know more?
                  </p>
                  <a
                    href="/creator"
                    className="inline-block px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition duration-300"
                  >
                    About Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
