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
        idsSituacoes: [15],
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

// New endpoint to fetch a specific sales order by ID
app.get('/api/pedidos/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const response = await axios.get(`https://www.bling.com.br/Api/v3/pedidos/vendas/${orderId}`, {
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

// Endpoint to receive the code parameter
app.get('/api/get-token', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Invalid code parameter.' });
  }
  console.log('reveived code:')
  console.log(code)
  try {
    const response = await axios.post('https://www.bling.com.br/Api/v3/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '1.0',
        'Authorization': 'Basic NWZlZjQ1NDZmZDMyMjk3MzlmY2EyMzVhYTFjNjkyNTljODRhMjgxYjo5ODQ4MmQ5ZGFlMTk1NTQzZDRiNjc4MWI2NjYyMDBhZTMwMzg0ZmJhNjU1ZTI5NTQwNTg4M2JlNDA3MzM=',
      },
    });
    console.log(response)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the token from Bling.' });
  }
});


app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
