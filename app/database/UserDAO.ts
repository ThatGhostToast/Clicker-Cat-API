import { User } from "../models/Users";
import * as mysql from "mysql";
import * as util from "util";

/*
DAO file used for connecting the API to the database
This DAO handles the users table in our database
*/

export class UserDAO
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "ClickerCat";
    private pool = this.initDbConnection();
    
    /**
     * Non-default constructor.
     * 
     * @constructor
     * @param host Database Hostname
     * @param username Database Username
     * @param password Database Password
     */
    constructor(host:string, port:number, username:string, password:string)
    {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }

     /**
     * CRUD method to create a new user.
     * 
     * @param user User to insert.
     * @param callback Callback function with -1 if an error else User ID created.  
     */
    public create(user:User, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert User
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query('INSERT INTO `USERS` (EMAIL, PASSWORD, NAME) VALUES(?,?,?)', [user.Email, user.Password, user.Name]);
            // If no rows were affected then return -1 to indicate an error
            if(result1.affectedRows != 1)
               callback(-1);

            //getting the id of the newly created User
            let userId = result1.insertId;

            // Do a callback to return the results
            callback(userId);
        });
    }

     /**
     * CRUD method to return all Users.
     * 
     * @param callback Callback function with an Array of type Users.
     */
    public findUsers(callback: any)
    {
        // List of Users to return
        let users:User[] = [];
        
        // Get a pooled connection to the database, run the query to get all the users, and return the List of Users
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all users
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query('SELECT * FROM `USERS`');
            // Looping over the results and adding each user to the list
            for(let x=0;x < result1.length;++x)
            {
                // Add user and its data to the list
                users.push(new User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE));
            }

            // Do a callback to return the results
            callback(users);
         });
     }

    /**
     * Method to find a user by their ID
     * 
     * @param id Id of the user being searched
     * @param callback Callback function with an Array of type Users.
     */
    public findUserById(id:number, callback: any)
    {
        // User that's going to be returned
        let user:User;

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Users for search
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query("SELECT * FROM `USERS` WHERE ID = ?", id);
            // Assigning the result to the user model using a loop
            for(let x=0;x < result1.length;++x)
            {
                // Get user from the database to return
                user = new User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
            }
            // Do a callback to return the results
            callback(user);
        });
    }

    /**
     * Method to find a user by their Email
     * 
     * @param email email of the user being searched
     * @param callback Callback function with an Array of type Users.
     */
    public findUserByEmail(email:string, callback: any)
    {
        // User that's going to be returned
        let user:User;

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Users for search
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query("SELECT * FROM `USERS` WHERE EMAIL = ?", email);
            // Adding the result to the user model 
            for(let x=0;x < result1.length;++x)
            {
                // Get user from the database to return
                user = new User(result1[x].ID, result1[x].EMAIL, result1[x].PASSWORD, result1[x].NAME, result1[x].ROLE);
            }
            // Do a callback to return the results
            callback(user);
        });
    }
    
     /**
     * CRUD method to update a User.
     * 
     * @param user User to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(user:User, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update User
            let changes = 0;
            // Use Promisfy Util to make an async function and insert User
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query("UPDATE `USERS` SET EMAIL=?, PASSWORD=?, NAME=?", [user.Email, user.Password, user.Name]);
            // If any row was affected in the database, update the changes variable to reflect that
            if(result1.changedRows != 0)
                ++changes;
            // Log Changes
            console.log(changes);
            // Do a callback to return the results
            callback(changes);
         });
     }

     /**
     * CRUD method to delete a User.
     * 
     * @param userId User ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(userId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete User
            let changes = 0;
            // Use Promisfy Util to make an async function and insert User
            connection.query = util.promisify(connection.query);
            // Database query assigned to a result variable
            let result1 = await connection.query('DELETE FROM `USERS` WHERE ID=?', [userId]);
            // Set the affected rows to the changes variable
            changes = changes + result1.affectedRows;

            // Do a callback to return the results
            callback(changes);
        });
    }

    //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */
    private initDbConnection():any
    {
        //Return a database connection
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
}