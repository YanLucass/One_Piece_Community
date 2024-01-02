import pool from "../db/conn";


class Like {
    constructor(content) {
        this.content = content;
    }

    //função para adicionar like
    static async addLike(likeData) {
        const { toughtId} = likeData;
        try {
            const likes = await this.getQtdLike(toughtId);
            let query;
            const value = [toughtId];

            //if it's the first like of the post.
            if(!likes) {
                query = `INSERT INTO likes (tought_id, qtd) VALUES ($1, 1) `
                await pool.query(query, value);
            }
            else {
                query = `UPDATE likes SET qtd = qtd + 1 WHERE tought_id = $1`;
                await pool.query(query, value);
            }
            
            
        } catch(err) {
            console.log('Deu erro', err);
        }
    }


    static async removeLike(toughtId) {
        try {
        
            const query = `UPDATE likes SET qtd = qtd -1 WHERE tought_id = $1`
            const value = [toughtId]
            const result = await pool.query(query, value);
        }
        catch(err) {
            console.log('Deu erro ao pegar quantidade de likes', err);
        }
    }


    //get qtd likes
    static async getQtdLike(toughtId) {

        try {
            const query = `SELECT qtd from likes WHERE tought_id = $1`
            const value = [toughtId]
            const result = await pool.query(query, value);
            return result.rows[0];
        }
        catch(err) {
            console.log('Deu erro ao pegar quantidade de likes', err);
        }
    }
}

export default Like;