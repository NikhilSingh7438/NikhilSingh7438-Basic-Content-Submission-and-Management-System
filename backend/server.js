const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://nikhilsing7438:NikhilSingh@cluster0.fmr33xs.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Content model
const contentSchema = new mongoose.Schema({
  submissions: [
    {
      title: String,
      description: String,
      File: String,
    },
  ],
});

const Content = mongoose.model('Content', contentSchema);

// API endpoint for content submission
app.post('/api/content', async (req, res) => {
  try {
    const { title, description, File } = req.body;

    // Find or create a Content document
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }

    // Add the new submission to the array
    content.submissions.push({ title, description, File });
    await content.save();

    res.status(201).json(content.submissions);
  } catch (error) {
    console.error('Error submitting content:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch all content submissions
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.json([]);
    }

    res.json(content.submissions);
  } catch (error) {
    console.error('Error fetching content submissions:', error);
    res.status(500).send('Internal Server Error');
  }
});


// API endpoint for deleting content submission
app.delete('/api/content/:submissionId', async (req, res) => {
  try {
    const submissionId = req.params.submissionId;

    let content = await Content.findOne();
    if (!content) {
      return res.status(404).json({ message: 'No content found' });
    }

    // Filter out the submission to delete
    content.submissions = content.submissions.filter(submission => submission._id.toString() !== submissionId);
    await content.save();

    res.status(200).json({ message: 'Content submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting content submission:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
