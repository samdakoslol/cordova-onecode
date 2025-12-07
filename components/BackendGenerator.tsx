import React, { useState } from 'react';
import { Copy, Check, FileJson, FileCode, Server } from 'lucide-react';
import { BackendFile } from '../types';

const files: BackendFile[] = [
  {
    name: 'package.json',
    language: 'json',
    content: `{
  "name": "plant-doctor-api",
  "version": "1.0.0",
  "main": "server.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "node-fetch": "^3.3.2"
  }
}`
  },
  {
    name: 'config.json',
    language: 'json',
    content: `{
  "adsURL": "YOUR_GOOGLE_SHEETS_URL_HERE",
  "backendURL": "https://my-cordova-api-new.onrender.com"
}`
  },
  {
    name: 'ads.json',
    language: 'json',
    content: `{
  "ads": []
}`
  },
  {
    name: 'server.js',
    language: 'javascript',
    content: `const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const analyze = require('./analyze');
const doctorAI = require('./doctorAI');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Helper to read JSON files safely
const readJsonFile = (filename) => {
    try {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        return null;
    } catch (err) {
        console.error(\`Error reading \${filename}:\`, err);
        return null;
    }
};

// 1. GET /
app.get('/', (req, res) => {
    res.json({ message: "Plant Doctor API is running..." });
});

// 2. GET /config
// This endpoint now retrieves the OpenAI Key from Server Environment Variables
app.get('/config', (req, res) => {
    const config = readJsonFile('config.json');
    if (config) {
        // We inject the API Key from the server environment into the response
        // MAKE SURE to set 'OPENAI_API_KEY' in Render Environment Variables
        const responseConfig = {
            ...config,
            openAIKey: process.env.OPENAI_API_KEY || null
        };
        res.json(responseConfig);
    } else {
        res.status(500).json({ error: "Config file not found" });
    }
});

// 3. GET /ads
app.get('/ads', async (req, res) => {
    const config = readJsonFile('config.json');
    
    // Try to fetch from Google Sheets if URL is present
    if (config && config.adsURL && config.adsURL.startsWith('http')) {
        try {
            console.log("Fetching ads from:", config.adsURL);
            const response = await fetch(config.adsURL);
            const data = await response.json();
            return res.json(data);
        } catch (error) {
            console.error("Failed to fetch remote ads, falling back to local file:", error);
        }
    }

    // Fallback to local ads.json
    const adsData = readJsonFile('ads.json');
    res.json(adsData || { ads: [] });
});

// 4. POST /analyze
app.post('/analyze', (req, res) => {
    const { base64Image } = req.body;
    if (!base64Image) {
        return res.status(400).json({ error: "No image provided" });
    }

    const result = analyze.analyzeImage(base64Image);
    res.json(result);
});

// 5. POST /doctor
app.post('/doctor', (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: "No question provided" });
    }

    const answer = doctorAI.askDoctor(question);
    res.json(answer);
});

app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});`
  },
  {
    name: 'analyze.js',
    language: 'javascript',
    content: `function analyzeImage(imageBase64) {
    // Mock Analysis Logic
    return {
        success: true,
        result: "بناءً على التحليل الأولي للصورة، يبدو أن النبات يتمتع بصحة جيدة ولكن توجد بعض البقع الصفراء التي قد تدل على نقص الحديد. يُنصح بإضافة سماد يحتوي على الحديد."
    };
}

module.exports = { analyzeImage };`
  },
  {
    name: 'doctorAI.js',
    language: 'javascript',
    content: `function askDoctor(question) {
    // Mock Doctor Logic
    return {
        answer: "أهلاً بك! أنا طبيب النباتات. بناءً على سؤالك، أنصحك بالتأكد من تعرض النبات لضوء كافٍ وتقليل الري في فصل الشتاء. هل لديك استفسار آخر؟"
    };
}

module.exports = { askDoctor };`
  }
];

export const BackendGenerator: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-blue-800 font-bold text-lg mb-2 flex items-center gap-2">
          <Server className="w-5 h-5" />
          ملفات الـ Backend (محدثة)
        </h3>
        <p className="text-blue-700 text-sm">
          تم تحديث <code>server.js</code> و <code>config.json</code> ليدعم الرابط الجديد وجلب مفتاح OpenAI من متغيرات البيئة.
        </p>
      </div>

      {files.map((file, index) => (
        <div key={file.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {file.language === 'json' ? <FileJson className="w-4 h-4 text-yellow-600" /> : <FileCode className="w-4 h-4 text-blue-600" />}
              <span className="font-mono font-semibold text-gray-700 text-sm">{file.name}</span>
            </div>
            <button
              onClick={() => handleCopy(file.content, index)}
              className="flex items-center gap-1.5 text-xs font-medium bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md transition-colors"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm font-mono dir-ltr text-left" dir="ltr">
              <code>{file.content}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};