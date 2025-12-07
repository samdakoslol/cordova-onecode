import React, { useState } from 'react';
import { Copy, Check, FileCode, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { BackendFile } from '../types';

const files: BackendFile[] = [
  {
    name: 'www/js/api.js',
    language: 'javascript',
    content: `// Service to handle all API communications
// Save this file as: www/js/api.js

const ApiService = (function() {
    // UPDATED: The exact URL provided by you
    const BASE_URL = 'https://my-cordova-api-new.onrender.com';
    
    let appConfig = null;

    return {
        /**
         * 1. Initialize & Fetch Configs (Includes OpenAI Key from Server)
         * GET /config
         */
        init: async function() {
            try {
                console.log('Connecting to:', BASE_URL);
                const response = await fetch(\`\${BASE_URL}/config\`);
                
                if (!response.ok) {
                    throw new Error(\`Config fetch failed: \${response.status}\`);
                }
                
                appConfig = await response.json();
                console.log('Configuration loaded successfully');
                
                if (appConfig.openAIKey) {
                    console.log('OpenAI Key received from server');
                } else {
                    console.warn('OpenAI Key not found in server response');
                }
                
                return appConfig;
            } catch (error) {
                console.error('Initialization Error:', error);
                throw error;
            }
        },

        /**
         * 2. Get Google Sheets Data (Ads/Tips)
         * GET /ads
         */
        getGoogleSheetsData: async function() {
            try {
                const response = await fetch(\`\${BASE_URL}/ads\`);
                const data = await response.json();
                return data; // Returns { ads: [...] }
            } catch (error) {
                console.error('Sheets Data Error:', error);
                return { ads: [] }; // Fallback
            }
        },

        /**
         * 3. Analyze Image using Server Logic
         * POST /analyze
         * @param {string} base64Image - The image string
         */
        analyzeImage: async function(base64Image) {
            try {
                const response = await fetch(\`\${BASE_URL}/analyze\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ base64Image: base64Image })
                });
                return await response.json();
            } catch (error) {
                console.error('Analyze Error:', error);
                return { success: false, result: "Connection failed" };
            }
        },

        /**
         * 4. Chat with Doctor
         * POST /doctor
         * @param {string} question 
         */
        askDoctor: async function(question) {
            try {
                const response = await fetch(\`\${BASE_URL}/doctor\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: question })
                });
                return await response.json();
            } catch (error) {
                console.error('Doctor Error:', error);
                return { answer: "Sorry, I cannot connect to the server right now." };
            }
        },

        // Helper to get config if needed elsewhere
        getConfig: function() {
            return appConfig;
        }
    };
})();

window.ApiService = ApiService;`
  },
  {
    name: 'www/js/index.js (Usage Example)',
    language: 'javascript',
    content: `// Example of how to use the ApiService in your main logic
// Add this inside your onDeviceReady function

document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    try {
        // 1. Initialize connection
        const config = await ApiService.init();
        console.log("Server connected successfully!");
        
        // Access the retrieved OpenAI Key if needed
        if(config.openAIKey) {
             console.log("Key is available for use");
        }

        // 2. Load Google Sheets Data automatically
        const sheetData = await ApiService.getGoogleSheetsData();
        console.log("Ads/Tips loaded:", sheetData);

    } catch (e) {
        alert("Failed to connect to server: " + e.message);
    }

    // Example: Hooking up the Analyze button
    const analyzeBtn = document.getElementById('analyze-btn');
    if(analyzeBtn) {
        analyzeBtn.addEventListener('click', async () => {
            // Assume you have base64 image data from camera
            // const result = await ApiService.analyzeImage(base64Image);
            // alert(result.result);
        });
    }
}`
  },
  {
    name: 'index.html (Security Policy)',
    language: 'html',
    content: `<!-- CRITICAL: Add this to your <head> in www/index.html -->
<!-- This allows connections to your Render server and images -->

<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline'; 
               media-src *; 
               img-src 'self' data: blob:; 
               connect-src 'self' https://my-cordova-api-new.onrender.com;">`
  },
  {
    name: 'config.xml',
    language: 'xml',
    content: `<!-- Add these lines to your config.xml -->

<!-- Allow requests to your server -->
<access origin="https://my-cordova-api-new.onrender.com" />
<allow-navigation href="https://my-cordova-api-new.onrender.com/*" />
<access origin="*" />`
  }
];

export const ClientCodeGenerator: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h3 className="text-purple-800 font-bold text-lg mb-2 flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          تحديث تطبيق Cordova
        </h3>
        <p className="text-purple-700 text-sm">
          تم تحديث الأكواد أدناه للاتصال بـ:
          <br />
          <span className="font-mono bg-purple-100 px-1 rounded text-xs">https://my-cordova-api-new.onrender.com</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <ShieldCheck className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800">أمان الاتصال (CSP)</h4>
            <p className="text-xs text-gray-500 mt-1">تم تحديث كود HTML للسماح بالاتصال بالسيرفر الجديد.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Zap className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800">API Module</h4>
            <p className="text-xs text-gray-500 mt-1">
              تم تحديث <code>Api.js</code> لاستقبال مفتاح OpenAI من السيرفر تلقائياً.
            </p>
          </div>
        </div>
      </div>

      {files.map((file, index) => (
        <div key={file.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-600" />
              <span className="font-mono font-semibold text-gray-700 text-sm dir-ltr">{file.name}</span>
            </div>
            <button
              onClick={() => handleCopy(file.content, index)}
              className="flex items-center gap-1.5 text-xs font-medium bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md transition-colors"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
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