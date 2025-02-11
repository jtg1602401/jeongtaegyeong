const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

exports.generateFeedback = async (content) => {
  console.log(content)
  const prompt = `
사용자의 경험을 분석하여 한국어 제목과 피드백을 작성하고 키워드를 분석하세요.

 **키워드 분석 규칙**:
 - 키워드는 사용자의 글을 분석하여 각 단어의 등장 횟수를 기억하고, 많이 나온 순서대로 3개를 반환합니다.
 - 예: "keyword": "떨림", "times": 8
 - 동일한 횟수가 있다면 이 경험에 더 관련된 중요한 키워드 순으로 반환합니다.

 **제목 작성 규칙**:
- 제목(title)은 15자 이내의 **한 줄 요약 형태**로 제시하세요.(예: "오늘 발표가 좀 어려우셨던 것 같아요")

**피드백(feedback) 작성 규칙**:
- 사용자가 긍정적인 경험을 했다면(예: "오늘은 정말 행복했어") 공감과 응원의 글을 써주세요. (예: "오늘 정말 기분 좋았겠다! 앞으로도 응원해.")
- 만일 실수나 실패에 대한 부정적인 경험이라면 1부터 4번까지의 규칙을 따르세요.
- 첫 문장은 **진심 어린 공감을 표현**하세요. (예: "노력한 만큼 좋은 결과가 나오지 않아 속상했겠어요.")
- 두 번째 문장은 사용자가 경험에서 배울 점을 알려주세요. (예: "하지만 실수는 배움의 과정입니다. 중요한 건 그 경험을 어떻게 받아들이고 성장하는가 입니다.")
- 세 번째 문장은 **실제로 도움이 될 구체적인 개선 방법**을 설명하세요.
- 마지막 문장은 **사용자가 자신감을 가질 수 있도록 격려하는 내용을 포함**하세요.
- **문장은 반드시 친절하고 자연스럽고 부드러운 한국어로 작성하세요.**
- **각 문장 앞에 숫자(1, 2, 3, 4) 또는 특수 기호(-, *, ·)를 붙이지 마세요.**
- **4문장으로 작성하세요.**
- **어색한 문장이나 단어는 사용하지 마세요.**

**사용자 경험**:
"${content}"

**출력 형식**:
{
    "keywords": [
        {"keyword": "떨림", "times": 8}, 
        {"keyword": "시험", "times": 5}, 
        {"keyword": "떨림", "times": 3} ]
    "title": "제목 내용",
    "feedback": "첫 번째 문장 두 번째 문장 세 번째 문장 네 번째 문장"
}
`;

  try {
    const result = await model.generateContent(prompt);
    let response = await result.response.text();

    console.log(response);
    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(response);

  } catch (error) {
    console.error(error);
    return {
      title: " 제목 생성 실패",
      feedback: " 피드백 생성 실패"
    };
  }
};
