import * as jwt from 'jsonwebtoken';

const secret: string = 'asdsdfdfgfdghghjjhkjkl';
const rounds: number = 12;

export default class Auth {

    public static createAccount(username: string, email: string, admin: number, clienID: number, callback: Function) {
        // User.userExists(email, (exists) => {
        //     if (exists) {
        //         callback('Email already exists', null);
        //     } else {
        //         User.createUser(username, email, admin, clienID, (err, result) => {
        //             if (err) {
        //                 callback(err, null);
        //             } else {
        //                 let token = Auth.generateToken(email, admin);
        //                 callback(err, token);
        //             }
        //         })
        //     }
        // });
    }

    public static isLoggedIn(token: string, callback: Function) {
        jwt.verify(token, secret, {algorithms: ['HS256']},  (err, decoded) => {
            if (err) {
                callback(err, false);
            } else {
                callback(err, true);
            }
        });
    }

    public static isAdmin(req, res, next) {
        let token = req.decoded;
        if(req.decoded.cs !== undefined && req.decoded.cs.auth !== undefined) {
            if (req.decoded.cs.auth === 'admin') {
                req.isAdmin = true;
            } else {
                req.isAdmin = false;
            }
        } else {
            req.isAdmin = false;
        }
        next();
    }

    public static adminRequired(req, res, next) {
        Auth.isAdmin(req, res, () => {
            if(req.isAdmin) {
                next();
            } else {
                res.redirect('/login');
            }
        })
    }

    public static loggedIn(req, res, next) {
        jwt.verify(req.cookies.authorization, secret, (err, decoded) => {
            if (err) {
                res.redirect('/login');
            } else {
                req.decoded = decoded;
                for (var key in decoded.cs) {
                    if (key == "org") {
                        req.clientID = decoded.cs[key];
                    }
                }
                next();
            }
        });
    }

    public static generateToken(username: string, admin: number): string {
        let data = {
            sub: username,
            iss: 'https://dashboard.location-sciences.ai',
            admin: admin,
        }
        let token: string = null;
        try {
            token = jwt.sign(data, secret, {
                expiresIn: '7d'
            });
        } catch (err) {
            console.log(err);
        }
        return token;
    }

    public static generateResetToken(email: string): string {
        let data = {
            sub: email,
            iss: 'https://dashboard.location-sciences.ai'
        }
        let token: string = null;
        try {
            token = jwt.sign(data, secret, {
                expiresIn: '1d'
            });
        } catch (err) {
            console.log(err);
        }
        return token;
    }

    public static validResetToken(email: string, token: string, callback: Function) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                callback(false);
            } else {
                if(decoded.sub === email) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
    }
}