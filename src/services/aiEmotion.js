const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.analyzeAiEmotionsAndFeedback = async (content) => {
  const prompt = `
사용자의 경험을 분석하고 감정 점수와 분석된 감정을 기반으로 피드백을 JSON 형식으로 출력하세요.  

**JSON 응답 예시**:
{
  "emotions": {
    "joy": 0.05,
    "sadness": 0.02,
    "anger": 0.54,
    "anxiety": 0.32,
    "satisfaction": 0.21
  },
  "feedback": "사용자의 감정을 공감하고 적절한 피드백을 제공하세요."
}
** 감정 분석 규칙**:
- 사용자의 경험에서 드러나는 감정의 강도를 분석합니다.
- 감정은 행복, 슬픔, 분노, 불안(당황), 만족감 다섯 가지입니다.
- 감정 점수는 0.00~1.00 사이의 소수점 둘째 자리까지 제공해야 합니다.

**피드백 작성 규칙**:
- 분석한 감정을 기반으로 경험에 대한 피드백을 작성해주세요.
- 사용자의 감정을 먼저 공감해 주세요.
- joy(기쁨)가 높으면 긍정적인 격려와 응원을 담아 주세요.
- sadness(슬픔)가 높으면 위로와 함께 긍정적인 방향을 제시해 주세요.
- anger(분노)가 높으면 공감한 후 감정을 조절할 수 있는 방법을 제안해 주세요.
- anxiety(불안)가 높으면 안정감을 줄 수 있도록 격려해 주세요.
- satisfaction(만족감)이 높으면 기쁨을 함께 나누고 더 발전할 수 있도록 조언해 주세요.
- 반드시 부드럽고 자연스러운 한국어 문장으로 작성하세요.
- 3~4문장으로 짧고 간결하게 작성하세요.

**사용자의 경험**:
"${content}"

**JSON 형식으로만 출력하세요!**`;

  try {
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    let response = await result.response.text();

    console.log(response);
    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(response);

  } catch (error) {
    console.error(error);
    return {
      emotions: { joy: 0.0, sadness: 0.0, anger: 0.0, anxiety: 0.0, satisfaction: 0.0 },
      feedback: "피드백 생성 실패"
    };
  }
};
