const reportService = require("../services/reportservice.js");

exports.getReports = async (req, res) => {
    try {
        const { userId, period } = req.query;
        const reportData = await reportService.getUserReports(userId, period);
        const emotions = await reportService.getUserEmotions(userId, period);

        
        let highestEmotion = { name: "", percentage: 0 };
        emotions.forEach(emotion => {
            if (emotion.emotion_percentage > highestEmotion.percentage) {
                highestEmotion = { name: emotion.emotion_name, percentage: emotion.emotion_percentage };
            }
        });


        const emotionMessages = {
            "sadness": "오늘은 슬픈 하루 였네요 😢",
            "anger": "오늘은 분노한 하루 였네요 😡",
            "anxiety": "오늘은 힘든 하루 였네요 😰",
            "joy": "오늘은 행복한 하루 였네요 😃"
        };
        const message = emotionMessages[highestEmotion.name] || "오늘은 평범한 하루였어요.";

        res.json({
            success: true,
            message,
            emotions: emotions.map(e => ({ name: e.emotion_name, percentage: e.emotion_percentage })),
        });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getReportDetails = async (req, res) => {
    try {
        const { userId } = req.query;
        const goalData = await reportService.getUserGoalProgress(userId);

       
        let goalMessage = goalData.progress >= 100
            ? "이번 주 목표 달성했어요! 🎉"
            : "이번 주 목표 달성을 위해 조금 더 노력해 보아요! 💪";

        res.json({
            success: true,
            goalMessage,
            progress: goalData.progress,
            goal: goalData.goal_name
        });
    } catch (error) {
        console.error("Error fetching report details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};