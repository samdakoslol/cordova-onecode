import React, { useState } from 'react';
import { LayoutDashboard, Stethoscope, Code, Sprout, BookOpen, Smartphone } from 'lucide-react';
import { AnalyzeView } from './components/AnalyzeView';
import { DoctorView } from './components/DoctorView';
import { BackendGenerator } from './components/BackendGenerator';
import { GuideView } from './components/GuideView';
import { ClientCodeGenerator } from './components/ClientCodeGenerator';

enum Tab {
  ANALYZE = 'analyze',
  DOCTOR = 'doctor',
  BACKEND = 'backend',
  CLIENT = 'client',
  GUIDE = 'guide'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ANALYZE);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-green-700" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Plant Doctor</h1>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
            نسخة تجريبية
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4">
        {activeTab === Tab.ANALYZE && <AnalyzeView />}
        {activeTab === Tab.DOCTOR && <DoctorView />}
        {activeTab === Tab.BACKEND && <BackendGenerator />}
        {activeTab === Tab.CLIENT && <ClientCodeGenerator />}
        {activeTab === Tab.GUIDE && <GuideView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="max-w-3xl mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab(Tab.ANALYZE)}
            className={`flex flex-col items-center py-2 px-2 flex-1 transition-colors ${
              activeTab === Tab.ANALYZE ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">فحص</span>
          </button>
          
          <button
            onClick={() => setActiveTab(Tab.DOCTOR)}
            className={`flex flex-col items-center py-2 px-2 flex-1 transition-colors ${
              activeTab === Tab.DOCTOR ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Stethoscope className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">الطبيب</span>
          </button>

          <button
            onClick={() => setActiveTab(Tab.BACKEND)}
            className={`flex flex-col items-center py-2 px-2 flex-1 transition-colors ${
              activeTab === Tab.BACKEND ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Code className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Server</span>
          </button>

          <button
            onClick={() => setActiveTab(Tab.CLIENT)}
            className={`flex flex-col items-center py-2 px-2 flex-1 transition-colors ${
              activeTab === Tab.CLIENT ? 'text-purple-600 bg-purple-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Smartphone className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Cordova</span>
          </button>

          <button
            onClick={() => setActiveTab(Tab.GUIDE)}
            className={`flex flex-col items-center py-2 px-2 flex-1 transition-colors ${
              activeTab === Tab.GUIDE ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">الدليل</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;