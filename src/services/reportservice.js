const db = require("../../config/db3");

exports.getUserReports = async (userId, period) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM Reports WHERE user_id = ? AND period_type = ?",
            [userId, period]
        );
        return rows;
    } catch (error) {
        console.error("Error in getUserReports:", error);
        throw error;
    }
};

exports.getUserEmotions = async (userId, period) => {
    try {
        const [rows] = await db.execute(
            "SELECT emotion_name, emotion_percentage FROM ReportEmotion WHERE report_id IN (SELECT report_id FROM Reports WHERE user_id = ? AND period_type = ?)",
            [userId, period]
        );
        return rows;
    } catch (error) {
        console.error("Error in getUserEmotions:", error);
        throw error;
    }
};

exports.getUserGoalProgress = async (userId) => {
    try {
        const [rows] = await db.execute(
            "SELECT goal_name, progress FROM Goals WHERE user_id = ?",
            [userId]
        );
        return rows.length > 0 ? rows[0] : { goal_name: "목표가 없습니다", progress: 0 };
    } catch (error) {
        console.error("Error in getUserGoalProgress:", error);
        throw error;
    }
};