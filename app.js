const express = require('express');
const app = express();

app.get('/health', (req, res) => res.json({ ok: true }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on ${port}`));
}

module.exports = app;
