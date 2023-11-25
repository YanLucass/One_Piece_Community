import pool from "../db/conn";

class User {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password
        this.confirmPassword = confirmPassword;
    }
    
    static async save(user) {
        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3 RETURNING*', [name, email, password])
        const createdUser = result.rows[0];
        return createdUser;


    }
}


export default User;