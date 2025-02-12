/**
 * @swagger
 * /api/{id}/date:
 *   post:
 *     summary: 날짜 설정
 *     description: 사용자가 특정 날짜를 선택하여 저장합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-10"
 *     responses:
 *       201:
 *         description: 경험 기록 생성 완료
 *       400:
 *         description: 요청 데이터가 유효하지 않음
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/record:
 *   put:
 *     summary: 경험 기록
 *     description: 사용자가 경험을 기록하고 감정을 선택합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 경험 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "오늘 발표에서 많이 긴장했다."
 *               emotion:
 *                 type: string
 *                 enum: ["행복했어요", "우울했어요", "그저 그랬어요"]
 *                 example: "우울했어요"
 *     responses:
 *       200:
 *         description: 경험 기록 및 감정 선택 완료
 *       400:
 *         description: 입력하지 않은 필드가 있음
 *       404:
 *         description: 경험 데이터를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/analysis:
 *   put:
 *     summary: AI 피드백 생성
 *     description: 사용자의 경험을 분석하여 피드백, 감정 분석, 성장 포인트를 생성합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 경험 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 경험 분석 및 저장 완료
 *       404:
 *         description: 경험 데이터를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/feedbacks:
 *   get:
 *     summary: 피드백 조회
 *     description: 사용자의 경험을 기반으로 저장된 AI 피드백을 불러옵니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 경험 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 피드백 데이터 반환
 *       404:
 *         description: 경험 데이터를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/recommands:
 *   get:
 *     summary: 추천 목표 조회
 *     description: 사용자의 경험을 기반으로 AI가 추천하는 목표를 가져옵니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 경험 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 추천 목표 데이터 반환
 *       404:
 *         description: 경험 데이터를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/save:
 *   put:
 *     summary: 추천 목표 저장
 *     description: AI가 추천한 목표를 저장합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 목표 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 목표 저장 완료
 *       404:
 *         description: 목표 데이터를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
