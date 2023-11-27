import pool from "../db/conn";

class User {
    constructor(name, email, password, image) {
        this.name = name;
        this.email = email;
        this.password = password
        this.image = image;
    }
    
    static async save(user) {
        try {
            const { name, email, password, image } = user;
            let query, values;
        
            if (image) {
                query = `INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4)`;
                values = [name, email, password, image];
            } else {
                query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
                values = [name, email, password];
            }
        
            await pool.query(query, values);
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