import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = Number(process.env.PORT || 3001);

const services = [
  {
    id: "passport",
    name: "Passport services",
    description: "Information and online services related to passports.",
    url: "https://www.passportindia.gov.in/"
  },
  {
    id: "income-tax",
    name: "Income tax services",
    description: "Online information and services for income tax.",
    url: "https://www.incometax.gov.in/"
  },
  {
    id: "digilocker",
    name: "DigiLocker",
    description: "Access and manage verified digital documents.",
    url: "https://www.digilocker.gov.in/"
  }
];

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/services", (req, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();
  if (q.length > 120) {
    return res.status(400).json({ error: "Query is too long." });
  }

  const items = q
    ? services.filter((service) =>
        `${service.name} ${service.description}`.toLowerCase().includes(q)
      )
    : [];

  res.json({ items });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
