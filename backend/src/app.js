import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // body -> req.body

// İstek loglama middleware'i
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString("tr-TR")}] ${req.method} ${req.url}`);
  if (req.method === "POST" || req.method === "PATCH") {
    console.log("  Gövde (Body):", req.body);
  }
  next();
});

// GET /
app.get("/", (req, res) => {
  res.json({
    message: "Kampüs Etkinlik API Aktif",
    endpoints: {
      health: "/health",
      events: "/events"
    }
  });
});

// GET /health
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012038"
  });
});

app.use("/events", eventRoutes);

app.use((req, res) => {
  // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((err, req, res, next) => {
  // hata yakalayıcı
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
