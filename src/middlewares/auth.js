const crypto = require('crypto');

const verifySignature = (req, res, next) => {
  const signature = req.headers['x-hub-signature-256'];
  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).json({ error: 'Firma non valida' });
  }
  next();
};

module.exports = {
  verifySignature
};