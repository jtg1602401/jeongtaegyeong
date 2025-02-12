const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

exports.generateGoals = async (content) => {
  // 한국 날짜 변경
  const today = new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString().split("T")[0];
  const prompt = `
사용자의 경험을 분석하고 사용자가 발전할 수 있는 구체적인 목표와 추천 학습 자료를 생성하여 JSON 형식으로 출력하세요.


**응답 규칙**:
- 목표(goals)는 5개를 제공하며, 사용자의 경험을 바탕으로 AI가 추천합니다. (예: 시선 처리 및 말하기 연습)
- 목표 제목과 설명은 각각 1줄로 구체적이고 실용적인 내용이어야 합니다. (예: 4주 동안 거울 앞에서 발표하며 시선 처리와 말하기를 매주 1회 이상 완료해보세요!)
- 목표 설명에는 몇 주동안 진행하고 몇 회를 진행할 건지 구체적으로 나타내야 합니다. (예: 2주동안 3회 연습습)
- 목표의 interval_weeks, interval_times 값을 정확히 설정합니다.
  - 예: "4주 동안 매주 1회" → interval_weeks = 1, interval_times = 1 -> 기간에 상관 없이 매주면 interval_weeks = 1, interval_times = 1 입니다.
  - 예: "2주 동안 3회" → interval_weeks = 2, interval_times = 3
  - 예: "3주 동안 3회 이상" → interval_weeks = 3, interval_times = 3
  - 예: "4주 동안 매일" -> interval_weeks = 1, interval_times = 7
- 목표의 start_date는 ${today} 입니다.
- 목표의 end_date는 start_date를 기준으로 목표에서 제공한 기간이 끝나는 날짜입니다. 다양하게 정해 주세요.(예: 4주 동안이면 시작 날짜로부터 4주후의 날짜) 
- **반드시 JSON 형식으로 출력하고, 추가 설명은 하지 마세요.**
- 추천 학습 자료(learnings)는 3개 제공 (예: "효과적인 발표 연습법")
- 학습 자료는 유튜브 검색이 가능한 **구체적인 키워드**로 제공 (예: "발표 스킬 향상 강의", "자신감 있는 스피치 방법")
- URL은 제공하지 않음 (YouTube API에서 보완할 예정)

 **JSON 응답 형식 (반드시 JSON 형식으로만 출력하세요!)**:
{
  "goals": [
    {
      "title": "목표 제목",
      "content": "목표 설명",
      "interval_weeks": X,  // 몇 주마다 수행하는지 (예: 1이면 매주 수행)
      "interval_times": Y   // interval_weeks 동안 몇 회 수행하는지 (예: 2주 동안 3회 수행 → X=2, Y=3)
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD"
    },
    ...
  ],
  "learnings": [
    {
      "title": "추천 학습 제목"
    },
    ...
  ]
}

**사용자의 경험**:
"${content}"

 **JSON 응답:**`;

  try {
    const result = await model.generateContent(prompt);
    let response = await result.response.text();

    console.log(response);
    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(response);
    
  } catch (error) {
    console.error(error);
    return null;
  }
};
