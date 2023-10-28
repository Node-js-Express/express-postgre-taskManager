// app.get('/api/v1/tasks')             - 모든 task를 가져오기
// app.post('/api/v1/tasks')            - 새로운 task 만들기
// app.get('/api/v1/tasks/:id')         - 해당 id에 대한 task를 가져오기
// app.patch('/api/v1/tasks/:id')       - 해당 id에 대한 task를 업데이트
// app.delete('/api/v1/tasks/:id')      - 해당 id에 대한 task를 삭제
import pool from "../db/connect.js";

const getAllTasks = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM tasks");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { name, completed } = req.body;
        const { rows } = await pool.query("INSERT INTO tasks(name, completed) VALUES($1, $2) RETURNING *", [name, completed]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;
        const { rows } = await pool.query("UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *", [name, completed, id]);

        if (rows.length === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

        if (rowCount === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).send('Task deleted');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

        if (rows.length === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask};

