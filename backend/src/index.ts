import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const incidents: any[] = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Smart City Emergency Response Backend!');
});
app.post('/api/incidents', (req, res) => {
  const incident = req.body;
  incident.id = incidents.length + 1;
  incidents.push(incident);
  console.log('New incident reported:', incident);
  res.status(201).json({ message: 'Incident recorded', id: incident.id });
});

app.get('/api/incidents', (req, res) => {
  res.json(incidents);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
