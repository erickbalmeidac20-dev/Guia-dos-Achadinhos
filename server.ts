import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API Routes
  app.get("/api/stats/overview", (req, res) => {
    res.json({
      totalSales: 8450.00,
      totalCommission: 845.00,
      totalClicks: 12450,
      conversionRate: 4.2
    });
  });

  app.get("/api/stats/chart", (req, res) => {
    const data = [
      { date: '06/03', clicks: 1200, sales: 45 },
      { date: '07/03', clicks: 1500, sales: 52 },
      { date: '08/03', clicks: 1100, sales: 38 },
      { date: '09/03', clicks: 1800, sales: 65 },
      { date: '10/03', clicks: 2200, sales: 82 },
      { date: '11/03', clicks: 1900, sales: 71 },
      { date: '12/03', clicks: 2500, sales: 95 },
    ];
    res.json(data);
  });

  app.get("/api/stats/sources", (req, res) => {
    const data = [
      { name: 'TikTok', value: 450 },
      { name: 'Instagram', value: 300 },
      { name: 'WhatsApp', value: 150 },
      { name: 'YouTube', value: 100 },
    ];
    res.json(data);
  });

  app.get("/api/config/status", (req, res) => {
    res.json({ shopeeConfigured: true, telegramConfigured: false });
  });

  app.post("/api/sync/shopee", (req, res) => {
    // Simulate sync delay
    setTimeout(() => {
      res.json({ success: true, count: 12 });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
