const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/pedidos', async (req, res) => {
  try {
    const response = await axios.get('https://www.bling.com.br/Api/v3/pedidos/vendas', {
      params: {
        pagina: 1,
        limite: 100,
        idsSituacoes: [6],
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.KEY}`
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
