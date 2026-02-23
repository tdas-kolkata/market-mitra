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
  "nifty50": "bg-indigo-400",          // #818cf8
  "niftymidcap150": "bg-emerald-400",  // #34d399
  "niftynext50": "bg-amber-400",      // #fbbf24
  "niftysmallcap250": "bg-red-400",    // #f87171
  "default": "bg-slate-400"           // #94a3b8
};

import React, { useState } from 'react';

export default function RiskReturnChart({
  data,
}: {
  data: RiskReturnPlotInterface[];
}) {
  // Get all unique sources (industries)
  const allSources = Array.from(new Set(data.map(d => d.meta?.source || 'Default')));
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set(allSources));

  // Helper to toggle selection
  const toggleSource = (source: string) => {
    setSelectedSources(prev => {
      const next = new Set(prev);
      if (next.has(source)) {
        next.delete(source);
      } else {
        next.add(source);
      }
      return next;
    });
  };

  // Helper to select/deselect all
  const toggleAll = () => {
    setSelectedSources(prev =>
      prev.size === allSources.length ? new Set() : new Set(allSources)
    );
  };

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Performance boost for panning
    scales: {
      x: {
        type: 'linear',
        min: 5,
        max: 80,
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
        min: -50,
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

  // Group data by meta.source (industry)
  const groupedData: Record<string, RiskReturnPlotInterface[]> = {};
  data.forEach((point) => {
    const source = point.meta?.source || 'Default';
    if (!groupedData[source]) groupedData[source] = [];
    groupedData[source].push(point);
  });

  // Filter datasets based on selectedSources
  const filteredDatasets = Object.entries(groupedData)
    .filter(([source]) => selectedSources.has(source))
    .map(([source, points]) => ({
      label: source,
      data: points,
      backgroundColor: INDUSTRY_COLORS[source] || INDUSTRY_COLORS.Default,
      pointRadius: 4, // Always 4, not affected by selection
      pointHoverRadius: 6, // Always 6, not affected by selection
    }));

  const chartData: ChartData<'scatter'> = {
    datasets: filteredDatasets,
  };

  return (
    <div className="w-10/12 mx-auto" style={{ height: '600px' }}>

      <Scatter options={options} data={chartData} />
            {/* Multi-selectable group control */}
      <div className="flex justify-center gap-2 py-4 my-5 flex-wrap">
        <button
          className={`px-3 py-1 rounded-full border border-slate-400 transition-colors duration-100 font-bold min-w-22.5 h-9 leading-none shadow-sm ${selectedSources.size === allSources.length ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900'}`}
          style={{ boxSizing: 'border-box', height: '36px', fontWeight: 700, lineHeight: '1.2', textShadow: selectedSources.size === allSources.length ? '0 1px 2px #0006' : 'none' }}
          onClick={toggleAll}
        >
          All
        </button>
        {allSources.map((source) => (
          <button
            key={source}
            className={`px-3 py-1 rounded-full border border-slate-400 transition-colors duration-100 font-bold min-w-22.5h-9 leading-none shadow-sm ${selectedSources.has(source) ? (INDUSTRY_COLORS_TW_CLASS[source] + ' text-white') : 'bg-slate-100 text-slate-900'}`}
            style={{ boxSizing: 'border-box', height: '36px', fontWeight: 700, lineHeight: '1.2', textShadow: selectedSources.has(source) ? '0 1px 2px #0006' : 'none' }}
            onClick={() => toggleSource(source)}
          >
            {source.charAt(0).toUpperCase() + source.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}