const db = require("../../config/db");

// 오늘 기록을 작성한 사람의 수를 세는 함수
const getTodayRecordsCount = async () => {
    try {
      // 오늘 날짜에 해당하는 경험 기록을 조회
      const query = "SELECT COUNT(DISTINCT user_id) AS count FROM Experiences WHERE date = CURRENT_DATE";
      const result = await db.query(query);
  
      console.log("Query result:", result);
      const count = result[0].count; // 결과에서 count 값을 추출
      if (count === 0) {
        return "0"; // 데이터가 없으면 메시지 반환
      }
  
      return `${count}`; // 경험을 기록한 사람 수 반환
    } catch (error) {
      console.error("Error fetching today's record count:", error);
      throw new Error("Error fetching today's record count");
    }
  };

module.exports = { getTodayRecordsCount };
