//import bd
import pool from "../db/conn";

class Wano {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    //saveWano tought 
    static async save(archTought) {
        const { title, content, userId } = archTought;
        try {
            let query;
            let values;
    
            if (title) {
                query = `INSERT INTO wanotoughts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id`;
                values = [title, content, userId];
            } else {
                query = `INSERT INTO wanotoughts (content, user_id) VALUES ($1, $2) RETURNING id, title, content, user_id`;
                values = [content, userId];
            }
    
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao salvar o comentário', error);
            throw error;
        }
    }
    

    //get all wano tought
    static async getAllWanoTought() {
        try {
            const query = `SELECT wanotoughts.*, users.name AS user_name, users.image AS user_image
            FROM wanotoughts
            INNER JOIN users ON wanotoughts.user_id = users.id
            ORDER BY wanotoughts.created_at DESC`
            const result = await pool.query(query)
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar os comentários de wano', error);
            throw error;
        }   
    }

}

export default Wano;