const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const db_host = process.env.DB_HOST || 'localhost'
const db_url = 'mongodb://' + db_host + ':27017/blog_app'
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB under: ' + db_url);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const blogEntrySchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: { type: Date, default: Date.now }
});

const BlogEntry = mongoose.model('BlogEntry', blogEntrySchema);

app.use(express.json());

app.get('/api/blog_entries', (req, res) => {
  BlogEntry.find()
    .then((entries) => {
      res.json(entries);
    })
    .catch((error) => {
      console.error('Error getting blog entries:', error);
      res.status(500).json({ error: 'Server error' });
    });
});

app.post('/api/blog_entries', (req, res) => {
  const { title, content } = req.body;

  const newEntry = new BlogEntry({ title, content });

  newEntry.save()
    .then((entry) => {
      res.json(entry);
    })
    .catch((error) => {
      console.error('Error creating blog entry:', error);
      res.status(500).json({ error: 'Server error' });
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
