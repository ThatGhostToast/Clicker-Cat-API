/**
 * Model for our users in the database
 * @export
 * @class User
 */
export class User {
    /**
     * Id of the user
     * @private
     * @type {number}
     * @memberof User
     */
    private id: number = -1;
    /**
     * The user's email
     * @private
     * @type {string}
     * @memberof User
     */
    private email: string = "";

    /**
     * The user's password
     * @private
     * @type {string}
     * @memberof User
     */
    private password: string = "";

    /**
     * The user's name
     * @private
     * @type {string}
     * @memberof User
     */
    private name: string = "";

    /**
     * The user's role
     * @private
     * @type {string}
     * @memberof User
     */
    private role: string = "";

    /**
     * User Constructor
     * @constructor
     * @param id Id of the user
     * @param firstName The user's first name
     * @param lastName The user's last name
     * @param email The user's email
     * @param password The user's password
     * @param birthday The user's birthday
     * @param sex The user's sex
     * @param conditions The user's pre existing conditions
     * @param image The user's profile picture
     */
    constructor(id: number, email: string,password: string, name: string, role: string)
    {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

     /**
      * Method to get the Id of the user
      *
      * @type {number}
      * @memberof User
      */
     public get Id(): number  
     {
		return this.id;
	}
     /**
      * Method to set the Id of the user
      *
      * @memberof User
      */
     public set Id(value: number ) 
     {
		this.id = value;
	}

     /**
      * Method to get the name of the user
      *
      * @type {string}
      * @memberof User
      */
     public get Name(): string  
     {
		return this.name;
	}
     /**
      * Method to set the name of the user
      *
      * @memberof User
      */
     public set Name(value: string ) 
     {
		this.name = value;
	}

     /**
      * Method to get the email of the user
      *
      * @type {string}
      * @memberof User
      */
     public get Email(): string  
     {
		return this.email;
	}
     /**
      * Method to set the email of the user
      *
      * @memberof User
      */
     public set Email(value: string ) 
     {
		this.email = value;
	}

     /**
      * Method to get the user's password
      *
      * @type {string}
      * @memberof User
      */
     public get Password(): string  
     {
		return this.password;
	}
     /**
      * Method to set the user's password
      *
      * @memberof User
      */
     public set Password(value: string) 
     {
		this.password = value;
	}

}
