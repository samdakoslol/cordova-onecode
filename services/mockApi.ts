import { AnalyzeResult } from '../types';

// محاكاة تأخير الشبكة
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAnalyzeImage = async (imageBase64: string): Promise<AnalyzeResult> => {
  await delay(1500); // محاكاة المعالجة
  return {
    success: true,
    result: "بناءً على التحليل الأولي، يبدو أن النبات يعاني من نقص في الري، وتوجد بعض العلامات التي تشير إلى بداية ذبول الأوراق. يُنصح بري النبات بانتظام والتأكد من تعرضه لضوء الشمس غير المباشر."
  };
};

export const mockAskDoctor = async (question: string): Promise<{ answer: string }> => {
  await delay(1000); // محاكاة التفكير
  return {
    answer: "أهلاً بك. أنا طبيب النباتات الآلي. بناءً على وصفك، أنصحك بفحص التربة للتأكد من تصريف المياه الجيد، وتجنب استخدام الأسمدة الكيميائية بكثرة في الوقت الحالي. هل يمكنك تزويدي بصورة للنبات؟"
  };
};

export const mockGetConfig = async () => {
  return {
    adsURL: "https://docs.google.com/spreadsheets/d/MjEiXB...",
    backendURL: "https://plant-doctor-api.onrender.com"
  };
};