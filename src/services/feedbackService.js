const pool = require("../../config/db3.js");

// 경험 피드백 조회
exports.getFeedbackData = async (id) => {
  try {
    const experienceId = parseInt(id);

    const [[experience]] = await pool.query("SELECT title, feedback, keywords FROM Experiences WHERE experience_id = ?", [experienceId]);

    if (!experience) {
      return res.status(404).json({ message: "해당 경험을 찾을 수 없습니다." });
    }

    console.log(experience);

    // 감정 분석 조회
    const [[emotions]] = await pool.query(`SELECT joy, sadness, anger, anxiety, satisfaction, feedback FROM Emotions WHERE experience_id = ?`, [experienceId]);

    if (!emotions) {
      return res.status(404).json({ message: "해당 경험을 찾을 수 없습니다." });
    } 
    console.log(emotions);


    // 성장 포인트 조회
    const [[growths]] = await pool.query("SELECT point, potential FROM Growths WHERE experience_id = ?", [experienceId]);

    if (!growths) {
      return res.status(404).json({ message: "해당 경험을 찾을 수 없습니다." });
    }
    console.log(growths);

    return {
      title: experience.title,
      feedback: experience.feedback, 
      keywords: experience.keywords, 
      emotions: emotions
        ? {
            joy: emotions.joy,
            sadness: emotions.sadness,
            anger: emotions.anger,
            anxiety: emotions.anxiety,
            satisfaction: emotions.satisfaction,
            feedback: emotions.feedback,
          }
        : null,
      growth_points: growths ? growths.point : [],
      growth_potential: growths ? growths.potential : null,
    };
  }
  catch (error) {
    console.error(error);
    return null;
  };
};
