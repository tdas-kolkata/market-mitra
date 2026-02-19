"use client";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { RiskReturnPlotInterface } from "@/interfaces/risk_return_data_interface";
import {Badge} from "@/components/ui/badge"

// Register Chart.js components and the zoom plugin
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, zoomPlugin);



const INDUSTRY_COLORS: Record<string, string> = {
  "nifty50": "#818cf8", // Indigo
  "niftymidcap150": "#34d399", // Emerald
  "niftynext50": "#fbbf24", // Amber
  "niftysmallcap250": "#f87171", // Red
  "Default": "#94a3b8" // Slate
};

const INDUSTRY_COLORS_TW_CLASS: Record<string, string> = {
  "nifty50": "bg-indigo-400 m-2",          // #818cf8
  "niftymidcap150": "bg-emerald-400 m-2",  // #34d399
  "niftynext50": "bg-amber-400 m-2",      // #fbbf24
  "niftysmallcap250": "bg-red-400 m-2",    // #f87171
  "default": "bg-slate-400 m-2"           // #94a3b8
};

export default function RiskReturnChart({
  data,
}: {
  data: RiskReturnPlotInterface[];
}) {
  
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Performance boost for panning
    scales: {
      x: {
        type: 'linear',
        min: 1.2,
        max: 5,
        title: {
          display: true,
          text: `Risk Score ${'\u2192'}`,
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value) => Number(value).toFixed(2),
        }
      },
      y: {
        type: 'linear',
        min: -100,
        title: {
          display: true,
          text: `Annualized Return (%) ${'\u2192'}`,
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    },
    plugins: {
      legend: { display: false },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'xy',
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1e293b',
        titleColor: '#818cf8',
        bodyColor: '#f8fafc',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          // Customizing tooltip content using your meta data
          label: (context: TooltipItem<'scatter'>) => {
            const p = context.raw as { x: number; y: number; meta: { ticker: string; companyName: string; total_days: number; industry: string } };
            const { ticker, companyName, total_days, industry } = p.meta;
            // Returning an array creates multiple lines in the default tooltip
            return [
              `${ticker}`,
              `${companyName}`,
              `Days: ${total_days}`,
              `Industry:${industry}`,
              `Risk: ${p.x}`,
              `Return: ${p.y}%`
            ];
          }
        }
      }
    }
  };

  const chartData: ChartData<'scatter'> = {
    datasets: [
      {
        label: "Equity Risk-Return",
        data: data as RiskReturnPlotInterface[], // Chart.js accepts objects with {x, y} and custom fields
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => { 
          const industry = (context.raw as RiskReturnPlotInterface)?.meta?.source;
          return INDUSTRY_COLORS[industry] || INDUSTRY_COLORS.Default;
        },
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className="w-10/12 mx-auto" style={{ height: '600px' }}>
      <Scatter options={options} data={chartData} />
    <div className='flex w-full justify-center'>
        <Badge className={INDUSTRY_COLORS_TW_CLASS['nifty50']}>Nifty 50</Badge>
        <Badge className={INDUSTRY_COLORS_TW_CLASS['niftynext50']}>Nifty Next 50</Badge>
        <Badge className={INDUSTRY_COLORS_TW_CLASS['niftymidcap150']}>Nifty Midcap 150</Badge>
        <Badge className={INDUSTRY_COLORS_TW_CLASS['niftysmallcap250']}>Nifty Smallcap 250</Badge>
        <Badge className={INDUSTRY_COLORS_TW_CLASS['default']}>Others</Badge>
    </div>
    </div>
  );
}