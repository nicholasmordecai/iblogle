import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { UserModel } from './../../models/mysql/user';

const secret: string = 'asdsdfdfgfdghghjjhkjkl';
const rounds: number = 12;

export class Authentication {

    /**
     * Login From Route
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {Function} callback 
     * 
     * @description when a user logs in via the website, the data is to the backend, and this function is called to process the login
     */
    public static login(email: string, password: string, remember: boolean, callback: Function) {

        // check if the correct parameters have been send
        if (!email || !password || typeof (email) !== "string" || typeof (password) !== "string") {
            callback('no password or email received', null);
            return;
        }

        // call the User.login function to fetch the users data by the email address
        UserModel.getUserByEmail(email)
            .then((user) => {
                // if more than 1 user was found, there's a problem. There should never be more than one user with the same email
                if (user.length > 1) {
                    callback('More than 1 account', null);
                    return;
                }

                // if no accounts were found, then an invalid email address was entered
                if (user.length < 1) {
                    callback('No account was found', null);
                    return;
                }

                // assuming then, that 1 and only 1 account was returned, compare the two passwords and if it's a match, then generate a token.
                bcrypt.compare(password, user[0].password, (err, match) => {
                    if (match) {
                        let userPayload = {
                            cid: user[0].id,
                            email: user[0].email_address,
                            name: user[0].name,
                            firstName: user[0].first_name,
                            surname: user[0].surname,
                            role: user[0].role,
                            permissions: user[0].permissions
                        }
                        console.log(userPayload)
                        let token = Authentication.generateToken(userPayload, remember);
                        callback(null, token);
                    } else {
                        callback('Passwords did not match', null);
                    }
                });
            })
            .catch((error) => {
                callback(error, null);
            });
    }

    /**
     * Create Account
     * 
     * @param {string} username 
     * @param {string} email 
     * @param {string} password 
     * @param {Function} callback 
     * 
     * @description creates a new account
     * 
     * @todo validate the email is unique before inserting into the database
     */
    public static createAccount(username: string, email: string, password: string, callback: Function) {

        // hash the password with the constant number of rounds declared above
        bcrypt.hash(password, rounds, (err, hash) => {
            // call the User.createUser model, which inserts a new record in the database
            // User.createUser(username, email, hash, (err, result) => {
            //     if(err) {
            //         callback(true, null);
            //     } else {
            //         callback(err, true);
            //     }
            // })
        });
    }

    /**
     * Hash New Password
     * @param {string} password 
     * @param {Function} callback 
     * 
     * @description accepts a password, and uses bcrypt to hash the password
     * 
     * @todo validate a password has been passed before attempting to hash it
     */
    public static hashNewPassword(password, callback: Function) {
        bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, hash);
            }
        });
    }

    /**
     * Is Logged In
     * @param {string} token 
     * @param {Function} callback 
     * 
     * @description accepts a JWT token (that is generated in the login method) and validates checks it's validity using the expire time, token secret, iis and the base 64 integrity
     * 
     * @todo parameter verification 
     */
    public static validToken(token: string, callback: Function) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    }

    /**
     * Is Administrator Middleware Function
     * @param req 
     * @param res 
     * @param next 
     * 
     * @description uses the req.decoded field (generated once the loggedIn method is called) and stores a convenient property to access for handlebars use
     * If the user is not an administrator, then redirect the user to the homepage
     */
    public static isAdmin(req, res, next) {
        jwt.verify(req.cookies.authorization, secret, (err, decoded) => {
            if (err) {
                res.redirect('/admin-login');
            } else {
                req.decoded = decoded;
                if (!req.decoded) {
                    res.redirect('/admin-login');
                } else {
                    if (req.decoded.role === 1) {
                        next();
                    } else {
                        res.redirect('/admin-login');
                    }
                }
            }
        });
    }

    /**
     * Is Logged In Middleware Function
     * @param req 
     * @param res 
     * @param next 
     * 
     * @description uses the authorization cookie passed in the request header, and validates that the user is logged in. If they are not, then redirect them to the login page
     */
    public static loggedIn(req, res, next) {
        jwt.verify(req.cookies.authorization, secret, (err, decoded) => {
            if (err) {
                res.redirect('/admin-login');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }

    /**
     * Generate Token
     * 
     * @param {string} id 
     * @param {string} username 
     * @param {number} permissions 
     * 
     * @description a helper function for making it simpler to generate a new JWT token
     * 
     * @todo create a global variable for the iss
     */
    private static generateToken(payload: Object, remember: boolean): string | Error | never {
        let token: string;
        try {
            token = jwt.sign(payload, secret, {
                expiresIn: (remember) ? '14d' : '1d'
            });
            return token;
        } catch (error) {
            return new Error(error);
        }
    }
}