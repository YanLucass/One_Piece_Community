import pool from "../db/conn";

class Toughts {

    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static async saveTought(tought) {
        try {
            const { title, content, userId } = tought;
            const query = `INSERT INTO toughts (title, content, user_id) VALUES ($1, $2, $3)`
            const values = [title, content, userId];
            await pool.query(query, values);
        }

        catch(err) {
            console.log('Erro ao criar o pensamento',err);
        }
    }

    //getAll
    static async getAllThoughts() {
        try {
            const query = `
              SELECT toughts.*, users.name AS user_name, users.image AS user_image
              FROM toughts 
              INNER JOIN users ON toughts.user_id = users.id
            `;
            const result = await pool.query(query);
            return result.rows;
        } catch(err) {
            console.log('Erro ao pegar todos pensamentos', err);
            throw err; 
        }
    }

    static async getUserToughts(userId) {
        try {
            const query = ` 
            SELECT t.*, u.name AS user_name
            FROM toughts t
            INNER JOIN users u ON t.user_id = u.id
            WHERE t.user_id = $1`;
            
            const value = [userId];
            const result = await pool.query(query, value);
            return result.rows;

        }catch(err) {
            console.log('Erro ao pegar os pensamentos do usuário', err);
            throw err
        }
    }


}

export default Toughts