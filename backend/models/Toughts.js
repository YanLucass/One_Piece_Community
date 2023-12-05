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
            console.log(err);
        }
    }


}

export default Toughts