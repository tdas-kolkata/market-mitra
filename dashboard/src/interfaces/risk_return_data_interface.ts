export interface RiskReturnDataInterface  {
  name: string;
  industry: string;
  source: string;
  stock: string;
  end_dt: Date; // For date objects from Postgres
  start_dt: Date;
  total_days: number;
  price_st: number;
  price_end: number;
  abs_return: number;
  abs_return_pct: number;
  abs_annualised_return_pct: number;
  risk: number;
  last_updated_at: Date;
}


export interface RiskReturnPlotInterface {
  x: number;
  y: number;
  meta: {
    ticker: string;
    industry: string;
    name?: string; // Optional: in case you want the full company name too
    source: string
  };
}
export function transformRiskReturnData(rows: RiskReturnDataInterface[]): RiskReturnPlotInterface[] {
  return rows.map((row) => ({
    // ApexCharts needs 'x' and 'y' for the axes
    x: Number(row.risk.toFixed(2)), 
    y: Number(row.abs_annualised_return_pct.toFixed(2)),
    
    // Everything else goes into 'meta' for the tooltip
    meta: {
      ticker: row.stock,
      industry: row.industry,
      source: row.source.split('_')[1],
      companyName: row.name,
      total_days: row.total_days
    }
  }));
}