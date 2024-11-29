import express from 'express';
import cors from 'cors';
import { checkDomain } from './services/domainService.js';

const app = express();

// Activation de CORS pour permettre les requêtes depuis n'importe quelle origine
app.use(cors());

// Utilisation du port fourni par l'environnement ou 3000 par défaut
const port = process.env.PORT || 3000;

// Route de santé pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'API de vérification de domaines opérationnelle',
    endpoints: {
      checkDomain: '/check/:domain'
    }
  });
});

app.get('/check/:domain', async (req, res) => {
  try {
    const domain = req.params.domain;
    const result = await checkDomain(domain);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});