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
                query = `INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4) RETURNING *`;
                values = [name, email, password, image];
            } else {
                query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
                values = [name, email, password];
            }
        
           const result = await pool.query(query, values);
           return result.rows[0];
          
        }
        catch(err) {
            console.log(err);
        }
    }

    static async findUserByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const result = await pool.query(query, [email]);
            if(result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } 
        catch(err) {
            console.log('Erro ao buscar por email', err);
            throw new Error("Erro ao buscar por email");

        }
    }

    static async findUserById(id) {
        try {
            const sqlQuery = `SELECT * FROM users WHERE id = $1`;
            const result = await pool.query(sqlQuery, [id])
            if(result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } 
        catch(err) {
            console.error("Erro ao buscar por id", err);
            throw new Error("Teve um erro ao buscar por id");
        }
    }

    static async updateUserById(userDataUpdate) {
        try {
            let query = '';
            let values = [];

            if(userDataUpdate.image) {
                query = `UPDATE users SET name = $1, email = $2, password = $3, image = $4 WHERE id = $5`;
                const { name, email, password, image, id} = userDataUpdate;
                values = [name, email, password, image, id];
            } else {
                query = `UPDATE users SET name = $1, email = $2, password = $3`
                const { name, email, password} = userDataUpdate;
                values = [name, email, password];
            }

            await pool.query(query, values);
            
        } catch(err) {
            console.log(err);
        }
    }
}

export default User;