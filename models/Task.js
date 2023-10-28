import pool from "../db/connect.js";

async function createSchema() {
    const client = await pool.connect();

    try {
        // 기존에 테이블이 존재하는지 확인하는 쿼리
        const checkTableExistsQuery = `
        SELECT EXISTS (
            SELECT FROM pg_tables
            WHERE schemaname = 'public'
            AND tablename = 'tasks'
        );
    `;

        // 테이블 존재 여부 조회
        const result = await client.query(checkTableExistsQuery);
        const tableExists = result.rows[0].exists;

        if (!tableExists) {
            // 스키마 생성 SQL 쿼리 작성
            const createSchemaQuery = `
            CREATE TABLE tasks (
              id SERIAL PRIMARY KEY,
              name VARCHAR(20) NOT NULL,
              completed BOOLEAN DEFAULT false
          );
        `;
            // 스키마 생성 쿼리 실행
            await client.query(createSchemaQuery);

            console.log("스키마 생성 완료");
        } else {
            console.log("스키마 이미 존재함");
        }
    } catch (error) {
        console.error("스키마 생성/확인 오류:", error);
    } finally {
        client.release();
    }
}

export default createSchema;
