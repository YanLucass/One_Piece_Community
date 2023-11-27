import pool from "../db/conn";

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password
    }
    
    static async save(user) {
        try {
            const {name, email, password } = user;
            const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`
            await pool.query(query, [name, email, password]); 
        } 
        catch(err) {
            console.log(err);
        }
    }

    static async findUserByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const result = await pool.query(query, [email]);
            return result.rows;
        } 
        catch(err) {
            console.log(err);
        }
    }
}

export default User;