require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI Config
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Parsing Functions
const parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const parseDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

// Summary Logic
const generateSummary = async (text) => {
  if (!text || text.trim().length === 0) return "No text extracted.";

  const prompt = `Summarize the following document in a concise way using bullet points:\n\n${text}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });
  return response.text;
};

// Routes
app.post('/api/summarize', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    let extractedText = '';

    if (fileExtension === '.pdf') {
      extractedText = await parsePDF(filePath);
    } else if (fileExtension === '.docx') {
      extractedText = await parseDOCX(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    const summary = await generateSummary(extractedText);

    // Optional: Clean up uploaded file after processing
    // fs.unlinkSync(filePath);

    res.json({
      filename: req.file.originalname,
      summary: summary
    });

  } catch (error) {
    console.error('Error during summarization:', error);

    let errorMessage = 'Internal Server Error';
    let statusCode = 500;

    if (error.status === 429) {
      errorMessage = 'Rate limit exceeded for Gemini API. Please wait a moment and try again.';
      statusCode = 429;
    } else if (error.status === 404) {
      errorMessage = 'The requested Gemini model was not found. Please check your configuration.';
      statusCode = 404;
    } else if (error.message && error.message.includes('API key')) {
      errorMessage = 'Invalid Gemini API key. Please check your .env file.';
      statusCode = 401;
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(statusCode).json({ error: errorMessage });
  }
});

app.get('/', (req, res) => {
  res.send('AI Document Summarizer Backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
