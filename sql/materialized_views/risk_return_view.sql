drop MATERIALIZED view if exists risk_return_view;
create MATERIALIZED VIEW risk_return_view AS
with var as (
	select distinct v.stock , stddev(v.pct_change) as risk, mean(v.pct_change) as avg_return from
	(	
		select p.* ,(p.close - LAG(p.close) OVER (PARTITION BY p.stock ORDER BY p.date))/LAG(p.close) OVER (PARTITION BY p.stock ORDER BY p.date) * 100 as pct_change 
		from prices p where p.dividends = 0 order by p."date" desc
	) v
	group by v.stock order by risk desc
),
bounds as(
	select p.stock, max(p."date" ) as end_dt, min(p."date" ) as start_dt, (max(p."date")::date - min(p."date" )::date) as total_days 
	from prices p 
	group by p.stock
)
select c.name, c.industry, c.source,
b.*, ps.close as price_st, pe."close" as price_end,
pe."close" - ps."close" as abs_return,
((pe."close" - ps."close" )/ ps."close") * 100 as abs_return_pct,
var.avg_return * 252 as abs_annualised_return_pct,
var.risk * sqrt(252) as risk,
CURRENT_TIMESTAMP AS last_updated_at
from bounds b
join prices ps on ps.date = b.start_dt and ps.stock = b.stock
join prices pe on pe.date = b.end_dt and pe.stock = b.stock
join var on var.stock = b.stock
join companies c on c.symbol = b.stock
;