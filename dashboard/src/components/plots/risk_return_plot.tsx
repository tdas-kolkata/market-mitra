"use client"
import dynamic from 'next/dynamic';
import {RiskReturnPlotInterface} from "@/interfaces/risk_return_data_interface"

const RiskReturnChart = dynamic(
  () => import('@/components/plots/risk_return_chart'),
  { 
    ssr: false,
    loading: () => <div className="h-200 w-full bg-slate-800 animate-pulse rounded-xl" />
  }
);

export default function Page({ data }: {data:RiskReturnPlotInterface[]}) {
  return (
    <div className="p-4">
      <RiskReturnChart data={data} />
    </div>
  );
}