import { MySQLController } from './../../controllers/database/mysqlController';

declare interface IUser {
    id: number;
    email_address: string;
    name: string;
    first_name: string;
    surname: string;
    role: number;
    permissions: number;
    password: string;
    reset_hash: string;
}

export class UserModel {

    public static getUsers(): Promise<Array<IUser>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    id, name, first_name, surname, email_address, role
                FROM users;`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getUserByEmail(emailAddress: string): Promise<Array<IUser>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    id, name, first_name, surname, role, permissions, email_address, password
                FROM users
                WHERE 
                    email_address = ?;`;

                MySQLController.executeQuery(query, [emailAddress], resolve, reject)
        });
    }

    public static getUserByID(id: number): Promise<Array<IUser>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    id, name, first_name, surname, email_address, role
                FROM users
                WHERE
                id = ?;`;

                MySQLController.executeQuery(query, [id], resolve, reject)
        });
    }

    public static createUser() {

    }

    public static updateUser() {

    }

    public static archiveUser(archived: number, id: number): Promise <[Object] | Error> {
        return new Promise((resolve, reject) => {
            let query = `
            UPDATE 
                users
            SET 
                archived = ?
            WHERE id = ?;`;

            MySQLController.executeQuery(query, [archived, id], resolve, reject)
        });
    }

    public static insertResetKey(key: string, id: number) {
        return new Promise((resolve, reject) => {
            let query = `
            UPDATE users
            SET 
                reset_key = ?,
                reset_key_created = DateNow()
            WHERE id = ?;`;

            MySQLController.executeQuery(query, [key, id], resolve, reject)
        });
    }

}