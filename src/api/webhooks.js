const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// In-memory storage for user data (replace with database in production)
const userSessions = new Map();

// Middleware to verify webhook signature
const verifySignature = (req, res, next) => {
  const signature = req.headers['x-uhmegle-signature'];
  if (!signature) return next(); // Skip if not a uhmegle webhook
  
  const hmac = crypto.createHmac('sha256', process.env.UHMEGLE_WEBHOOK_SECRET || 'your-secret-key');
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  next();
};

// Video call webhook handler
router.post('/video-call', verifySignature, (req, res) => {
  try {
    const { event, data } = req.body;
    
    if (event === 'call.started') {
      const { callId, participants } = data;
      console.log(`Video call started: ${callId}`);
      
      // Store user data for this call
      userSessions.set(callId, {
        participants,
        startTime: new Date(),
        status: 'active'
      });
      
      // Here you can add logic to restore user data
      restoreUserData(participants);
      
      return res.json({ 
        status: 'success',
        message: 'Call data processed',
        callId
      });
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing video call webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to restore user data
async function restoreUserData(participants) {
  try {
    // Example: Restore user data from your storage
    // This is where you would implement the actual data restoration logic
    console.log('Restoring data for participants:', participants);
    
    // For each participant, restore their data
    for (const userId of participants) {
      // Add your data restoration logic here
      console.log(`Restoring data for user: ${userId}`);
      
      // Example: You might want to fetch user data from your database
      // const userData = await UserData.findOne({ userId });
      // Then send this data to the frontend or process it as needed
    }
  } catch (error) {
    console.error('Error restoring user data:', error);
  }
}

// Existing GitHub webhook handler
router.post('/github', verifySignature, (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  console.log(`Evento ricevuto: ${event}`);
  
  // Gestisci diversi tipi di eventi
  switch (event) {
    case 'push':
      console.log('Push ricevuto sul branch:', payload.ref);
      // Aggiungi qui la logica per gestire il push
      break;
    case 'pull_request':
      console.log('Pull request:', payload.action);
      // Aggiungi qui la logica per gestire le pull request
      break;
    default:
      console.log('Evento non gestito:', event);
  }

  res.status(200).json({ received: true });
});

module.exports = router;