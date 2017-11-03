const app = require('./src/app.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('[App] Listening in http://localhost:' + PORT);
});
