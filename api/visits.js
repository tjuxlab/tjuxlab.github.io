let totalVisits = 0;
const countryVisits = {};

export default async function handler(req, res) {
  // 获取 IP
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown';

  // 获取国家（使用 Vercel 内置 geo）
  const country = req.headers['x-vercel-ip-country'] || 'Unknown';

  // 记录总访问量
  totalVisits++;

  // 国家访问量统计
  if (!countryVisits[country]) countryVisits[country] = 0;
  countryVisits[country]++;

  res.status(200).json({
    total_visits: totalVisits,
    country,
    country_visits: countryVisits[country]
  });
}
