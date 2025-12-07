import React from 'react';
import { BookOpen, Github, Cloud, Smartphone, AlertTriangle, CheckCircle, Terminal, Globe, Key } from 'lucide-react';

export const GuideView: React.FC = () => {
  return (
    <div className="space-y-8 pb-24 animate-fade-in">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h2 className="text-xl font-bold text-indigo-900">الدليل الشامل: من الصفر إلى الاحتراف</h2>
        </div>
        <p className="text-indigo-800 leading-relaxed">
          هذا الدليل سيأخذك خطوة بخطوة لرفع الـ Backend (السيرفر) الذي قمت بنسخه، وربطه بتطبيق Cordova الخاص بك، وحل جميع المشاكل المتوقعة.
        </p>
      </div>

      {/* Step 1: GitHub */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 p-4 flex items-center gap-2 text-white">
          <Github className="w-6 h-6" />
          <h3 className="font-bold text-lg">أولاً: رفع المشروع على GitHub</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="step">
            <h4 className="font-bold text-gray-800 mb-2">1. إنشاء حساب ومستودع (Repository)</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
              <li>ادخل على موقع <a href="https://github.com" target="_blank" className="text-blue-600 hover:underline">GitHub.com</a> وأنشئ حساباً جديداً.</li>
              <li>بعد الدخول، اضغط على علامة <strong>(+)</strong> في الزاوية العلوية واختر <strong>New repository</strong>.</li>
              <li>في خانة <strong>Repository name</strong> اكتب: <code>plant-doctor-api</code>.</li>
              <li>تأكد من اختيار <strong>Public</strong> (عام) لتسهيل الربط مع Render.</li>
              <li>اضغط على زر <strong>Create repository</strong>.</li>
            </ul>
          </div>

          <div className="step pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-2">2. رفع الملفات</h4>
            <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800 mb-3 border border-yellow-200">
              <strong>تنبيه هام:</strong> يجب أن تكون الملفات (server.js, package.json, etc) موجودة مباشرة في الصفحة الرئيسية للمستودع، وليست داخل مجلد فرعي.
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
              <li>في صفحة المستودع الجديد، اضغط على رابط <strong>uploading an existing file</strong>.</li>
              <li>قم بسحب وإفلات الملفات الـ 6 التي نسختها من قسم "ملفات السيرفر".</li>
              <li>انتظر حتى ينتهي التحميل، ثم اضغط على الزر الأخضر <strong>Commit changes</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 2: Render */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 p-4 flex items-center gap-2 text-white">
          <Cloud className="w-6 h-6" />
          <h3 className="font-bold text-lg">ثانياً: النشر على Render</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="step">
            <h4 className="font-bold text-gray-800 mb-2">1. إنشاء Web Service</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
              <li>اذهب إلى موقع <a href="https://render.com" target="_blank" className="text-blue-600 hover:underline">Render.com</a> وأنشئ حساباً (يمكنك الدخول بحساب GitHub).</li>
              <li>اضغط على زر <strong>New +</strong> واختر <strong>Web Service</strong>.</li>
              <li>اختر <strong>Build and deploy from a Git repository</strong>.</li>
              <li>اربط حسابك بـ GitHub ستظهر لك قائمة المستودعات، اختر <code>plant-doctor-api</code> واضغط <strong>Connect</strong>.</li>
            </ul>
          </div>

          <div className="step pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-2">2. الإعدادات (مهم جداً)</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm space-y-2 dir-ltr mb-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Build Command:</span>
                <span className="font-bold text-blue-600">npm install</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Start Command:</span>
                <span className="font-bold text-blue-600">node server.js</span>
              </div>
            </div>
          </div>
          
          <div className="step pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-600" />
              3. إضافة المفاتيح السرية (Environment Variables)
            </h4>
            <p className="text-gray-600 text-sm mb-3">
              لكي يعمل التطبيق ويسترجع مفتاح OpenAI، يجب إضافته في إعدادات Render:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4 text-sm">
              <li>في صفحة Render الخاصة بمشروعك، اذهب إلى تبويب <strong>Environment</strong>.</li>
              <li>اضغط على <strong>Add Environment Variable</strong>.</li>
              <li>في خانة Key اكتب: <code>OPENAI_API_KEY</code></li>
              <li>في خانة Value: ضع مفتاحك (يبدأ بـ sk-...).</li>
              <li>اضغط <strong>Save Changes</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 3: Cordova Integration */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 p-4 flex items-center gap-2 text-white">
          <Smartphone className="w-6 h-6" />
          <h3 className="font-bold text-lg">ثالثاً: الربط مع تطبيق Cordova</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>مفهوم أساسي:</strong> ملفات <code>analyze.js</code> و <code>doctorAI.js</code> و <code>config.json</code> التي أنشأتها <strong>لا توضع في تطبيق Cordova</strong>. هي تبقى في السيرفر (Render). تطبيقك فقط "يتصل" بها.
            </p>
          </div>

          <div className="step">
            <h4 className="font-bold text-gray-800 mb-2">أين أضع الرابط؟</h4>
            <p className="text-gray-600 mb-2">في ملف الجافاسكريبت الرئيسي لتطبيقك (مثلاً <code>js/index.js</code> أو <code>js/app.js</code>)، قم بتعريف الرابط كمتغير ثابت:</p>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm font-mono text-left mb-2" dir="ltr">
const BACKEND_URL = "https://my-cordova-api-new.onrender.com";</pre>
            <p className="text-gray-600 text-sm">استبدل الرابط برابط Render الخاص بك.</p>
          </div>

          <div className="step pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-2">كيفية إرسال الصور للتحليل (Analyze)</h4>
            <p className="text-gray-600 mb-2">استخدم دالة <code>fetch</code> داخل تطبيقك:</p>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm font-mono text-left overflow-x-auto" dir="ltr">{`async function sendImageToAnalyze(base64Image) {
  try {
    const response = await fetch(\`\${BACKEND_URL}/analyze\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ base64Image: base64Image })
    });

    const data = await response.json();
    if(data.success) {
      alert(data.result);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("فشل الاتصال بالسيرفر");
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Step 4: Testing & Troubleshooting */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 p-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="font-bold text-lg">رابعاً: الفحص وحل المشاكل</h3>
        </div>
        <div className="p-6 space-y-4">
          
          <div className="step">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              كيف تختبر السيرفر؟
            </h4>
            <p className="text-gray-600 text-sm mb-2">افتح المتصفح وجرب الروابط التالية (استبدل الرابط برابطك):</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 font-mono text-left" dir="ltr">
              <li><code>https://...onrender.com/</code> -> يجب أن يعطي رسالة ترحيب.</li>
              <li><code>https://...onrender.com/config</code> -> يجب أن يعرض محتوى JSON ومعه openAIKey إذا تم ضبطه.</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <h4 className="font-bold text-red-600 mb-3">حلول الأخطاء الشائعة:</h4>

          <div className="space-y-3">
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <p className="font-bold text-red-800 text-sm">خطأ: Cannot GET /doctor</p>
              <p className="text-red-700 text-xs mt-1">
                <strong>السبب:</strong> أنت تحاول فتح الرابط في المتصفح مباشرة. مسار <code>/doctor</code> هو <code>POST</code> وليس <code>GET</code>. لا يمكن فتحه في المتصفح، بل يعمل فقط عند إرسال طلب من الكود.
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <p className="font-bold text-red-800 text-sm">خطأ: Failed to deploy / package.json not found</p>
              <p className="text-red-700 text-xs mt-1">
                <strong>السبب:</strong> ملفاتك داخل مجلد فرعي في GitHub.
                <br/><strong>الحل:</strong> انقل الملفات (server.js, package.json) إلى الصفحة الرئيسية للمستودع (Root).
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <p className="font-bold text-red-800 text-sm">الشاشة السوداء أو عدم عمل fetch في Cordova</p>
              <p className="text-red-700 text-xs mt-1">
                <strong>الحل 1:</strong> تأكد من تثبيت إضافة Whitelist.
                <br/><strong>الحل 2:</strong> أضف السطر التالي في ملف <code>config.xml</code>:
                <br/><code className="text-xs font-mono bg-red-100 px-1 rounded">&lt;access origin="*" /&gt;</code>
                <br/><strong>الحل 3:</strong> تأكد من إضافة <code>Content-Security-Policy</code> مناسبة في ملف HTML.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};