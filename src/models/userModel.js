const db = require("../../config/db");

// 이메일로 사용자 찾기
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM Users WHERE email = ?';
  try {
    const [rows] = await db.promise().query(query, [email]);  // Promise 기반 쿼리 사용
    return rows[0] || null; // 결과가 있으면 첫 번째 항목 반환, 없으면 null 반환
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Error fetching user by email");
  }
};

// 새 사용자 추가
const createUser = async (name, email, password, age) => {
  const query = "INSERT INTO Users (name, email, password, age) VALUES (?, ?, ?, ?)";
  const values = [name, email, password, age];
  
  try {
    const [result] = await db.promise().query(query, values); // Promise 기반 쿼리 사용
    return result.insertId; // 삽입된 ID 반환
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

module.exports = { createUser, getUserByEmail };
