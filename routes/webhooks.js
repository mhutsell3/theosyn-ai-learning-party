const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET;

// Middleware to verify GHL webhook signature
const verifyWebhookSignature = (req, res, next) => {
  if (!WEBHOOK_SECRET) {
    console.warn('Warning: WEBHOOK_SECRET not configured');
    return next();
  }

  const signature = req.headers['x-ghl-signature'] || req.headers['x-webhook-signature'];
  const body = JSON.stringify(req.body);

  const hash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (signature && signature !== hash) {
    return res.status(401).json({
      error: true,
      message: 'Invalid webhook signature'
    });
  }

  next();
};

// Handle GHL webhook events
router.post('/ghl', verifyWebhookSignature, (req, res) => {
  try {
    const event = req.body;

    console.log('Webhook received:', {
      type: event.type,
      timestamp: new Date().toISOString(),
      payload: event
    });

    // Handle different event types
    switch (event.type) {
      case 'contact.updated':
        handleContactUpdated(event);
        break;
      case 'contact.created':
        handleContactCreated(event);
        break;
      case 'opportunity.updated':
        handleOpportunityUpdated(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt
    res.json({
      success: true,
      message: 'Webhook received and processed'
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to process webhook'
    });
  }
});

// Handle contact updated
function handleContactUpdated(event) {
  const contact = event.data;
  console.log(`Contact updated: ${contact.email}`);

  // Process contact update logic here
  // Examples:
  // - Send confirmation email
  // - Trigger automation workflows
  // - Update local database
}

// Handle contact created
function handleContactCreated(event) {
  const contact = event.data;
  console.log(`Contact created: ${contact.email}`);

  // Process new contact logic here
  // Examples:
  // - Send welcome email
  // - Assign to workflow
  // - Send confirmation SMS
}

// Handle opportunity updated
function handleOpportunityUpdated(event) {
  const opportunity = event.data;
  console.log(`Opportunity updated: ${opportunity.title}`);

  // Process opportunity update logic here
  // Examples:
  // - Log sales activity
  // - Send notifications
  // - Update analytics
}

// Test webhook endpoint
router.post('/test', (req, res) => {
  console.log('Test webhook received:', req.body);
  res.json({
    success: true,
    message: 'Test webhook received successfully'
  });
});

// Health check for webhook delivery
router.get('/status', (req, res) => {
  res.json({
    status: 'active',
    webhookSecret: WEBHOOK_SECRET ? 'configured' : 'not-configured',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
