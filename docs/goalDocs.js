/**
 * @swagger
 * /api/{id}/setGoal:
 *   post:
 *     summary: 목표 생성
 *     description: 사용자가 새로운 목표를 설정합니다.
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
 *               title:
 *                 type: string
 *                 example: "매일 운동하기"
 *               content:
 *                 type: string
 *                 example: "아침에 30분씩 조깅하기"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-10"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-10"
 *               interval_weeks:
 *                 type: integer
 *                 example: 1
 *               interval_times:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: 목표 생성 완료
 *       400:
 *         description: 필수 입력값 누락 또는 유효하지 않은 날짜
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/friendGoals:
 *   get:
 *     summary: 또래 목표 추천
 *     description: 사용자와 비슷한 연령대의 목표를 추천합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 또래 목표 데이터 반환
 */

/**
 * @swagger
 * /api/{id}/updateGoal:
 *   put:
 *     summary: 목표 수정
 *     description: 사용자가 기존 목표를 수정합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 목표 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "독서하기"
 *               content:
 *                 type: string
 *                 example: "한 달에 2권의 책 읽기"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-10"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-10"
 *               interval_weeks:
 *                 type: integer
 *                 example: 2
 *               interval_times:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: 목표 수정 완료
 *       400:
 *         description: 잘못된 요청 
 *       404:
 *         description: 목표를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/{id}/deleteGoal:
 *   delete:
 *     summary: 목표 삭제
 *     description: 사용자가 기존 목표를 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 목표 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 목표 삭제 완료
 *       404:
 *         description: 목표를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
