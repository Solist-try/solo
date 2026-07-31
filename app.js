const express = require('express');
const app = express();

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => res.json({ message: 'Welcome to Solo' }));
app.get('/api/data', (req, res) => res.json({ data: [1, 2, 3] }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on ${port}`));
}

module.exports = app;
