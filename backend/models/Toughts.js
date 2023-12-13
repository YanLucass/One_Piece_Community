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
              ORDER BY toughts.created_at DESC
            `;
            const result = await pool.query(query);
            return result.rows;
        } catch(err) {
            console.log('Erro ao pegar todos pensamentos', err);
            throw err; 
        }
    }

    //get all thoghts from user
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

    //gettought by id
    static async getById(toughtId) {
        try {
            const query = `SELECT * FROM toughts WHERE id = $1`
            const result = await pool.query(query, [toughtId]);
            if(result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        }
        catch(err) {
            console.error('Erro ao buscar o pensamento por ID:', err);
            throw err;
        }
    }

    //get thoghts by onwner 
    static async getUserThoughtById(id, userId) {
        try {
            const query = `SELECT * FROM toughts WHERE id = $1 AND user_id = $2 `
            const values = [id, userId];
            const userThought = await pool.query(query, values);
            return userThought.rows;
        } 
        catch(err) {
            console.log('Erro ao pegar pensamento do usuário' ,err);
            throw err;
        }
      
    }

    //edit user thought
    static async editUserThought(thought) {
        try {
           
            const { id, title, content } = thought;
            const query = `UPDATE toughts SET title = $1, content = $2 WHERE id = $3 RETURNING *`;
            const values = [title, content, id];
            const result = await pool.query(query, values);
            return result.rows
         
        } catch (err) {
            console.log(err);
            throw Error;
        }
    }

    //delete thought
    static async deleteTought(toughtId) {
        try {
            const query = `DELETE FROM toughts WHERE id = $1`;
            const value = [toughtId];
            const result = await pool.query(query, value);
            return result.rowCount;

        } catch (err) {
             console.error('Erro ao deletar o pensamento:', error);
            throw err;
        }
    }


    


}

export default Toughts