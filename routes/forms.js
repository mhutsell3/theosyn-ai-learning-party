const express = require('express');
const axios = require('axios');
const router = express.Router();

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_CONTACT_API_URL = process.env.GHL_CONTACT_API_URL || 'https://services.leadconnectorhq.com/contacts/';

const ghlHeaders = {
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

async function createGHLContact(contactData) {
  return axios.post(GHL_CONTACT_API_URL, {
    locationId: GHL_LOCATION_ID,
    ...contactData
  }, { headers: ghlHeaders });
}

// Newsletter Signup
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        error: true,
        message: 'Valid email is required'
      });
    }

    const response = await createGHLContact({
      email,
      firstName: '',
      lastName: '',
      source: 'Newsletter Signup',
      tags: ['newsletter-subscriber', 'theosyn-ai-party']
    });

    console.log(`Newsletter signup: ${email}`);

    res.json({
      success: true,
      message: 'Successfully subscribed to the TheoSYN Brief!',
      contactId: response.data.contact?.id
    });
  } catch (error) {
    console.error('Newsletter signup error:', error.response?.data || error.message);
    res.status(500).json({
      error: true,
      message: 'Failed to process subscription. Please try again.'
    });
  }
});

// AI Foundation Course Waitlist
router.post('/foundation-waitlist', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      });
    }

    const response = await createGHLContact({
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      source: 'AI Foundation Waitlist',
      tags: ['foundation-course-waitlist', 'theosyn-ai-party']
    });

    console.log(`Foundation course waitlist: ${email}`);

    res.json({
      success: true,
      message: 'You\'ve been added to the waitlist! We\'ll notify you when the course opens.',
      contactId: response.data.contact?.id
    });
  } catch (error) {
    console.error('Waitlist signup error:', error.response?.data || error.message);
    res.status(500).json({
      error: true,
      message: 'Failed to join waitlist. Please try again.'
    });
  }
});

// AI Party Registration
router.post('/party-registration', async (req, res) => {
  try {
    const { email, firstName, lastName, partyDate } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      });
    }

    const response = await createGHLContact({
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      source: 'AI Party Registration',
      tags: ['ai-party-attendee', 'theosyn-ai-party'],
      customFields: [
        { key: 'party_date', field_value: partyDate || 'TBD' }
      ]
    });

    console.log(`Party registration: ${email}`);

    res.json({
      success: true,
      message: 'Your spot is reserved! Check your email for details.',
      contactId: response.data.contact?.id
    });
  } catch (error) {
    console.error('Party registration error:', error.response?.data || error.message);
    res.status(500).json({
      error: true,
      message: 'Failed to register. Please try again.'
    });
  }
});

// Coaching Session Booking
router.post('/coaching-booking', async (req, res) => {
  try {
    const { email, firstName, lastName, topic } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      });
    }

    const response = await createGHLContact({
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      source: 'Coaching Booking',
      tags: ['coaching-client', 'theosyn-ai-party'],
      customFields: [
        { key: 'coaching_topic', field_value: topic || 'General AI' }
      ]
    });

    console.log(`Coaching booking: ${email}`);

    res.json({
      success: true,
      message: 'Booking request received! Milford will contact you shortly.',
      contactId: response.data.contact?.id
    });
  } catch (error) {
    console.error('Coaching booking error:', error.response?.data || error.message);
    res.status(500).json({
      error: true,
      message: 'Failed to process booking. Please try again.'
    });
  }
});

module.exports = router;
