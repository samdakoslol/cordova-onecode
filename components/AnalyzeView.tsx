import React, { useState } from 'react';
import { Upload, Camera, Loader2, AlertCircle, Leaf } from 'lucide-react';
import { mockAnalyzeImage } from '../services/mockApi';

export const AnalyzeView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    try {
      const response = await mockAnalyzeImage(selectedImage);
      setResult(response.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <Leaf className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-green-800">فحص صحة النبات</h2>
        <p className="text-green-700 mt-2">ارفع صورة لنباتك وسيقوم الطبيب الآلي بتحليلها.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-md shadow-md" />
          ) : (
            <div className="space-y-3">
              <Camera className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-gray-500 font-medium">اضغط هنا لالتقاط صورة أو رفع ملف</p>
            </div>
          )}
        </div>

        {selectedImage && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                تحليل الصورة الآن
              </>
            )}
          </button>
        )}
      </div>

      {result && (
        <div className="bg-white border-r-4 border-green-500 p-6 rounded-lg shadow-md animate-fade-in">
          <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-green-600" />
            نتيجة التشخيص
          </h3>
          <p className="text-gray-700 leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
};