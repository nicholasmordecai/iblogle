import * as Express from 'express';
import { Authentication } from './../controllers/core/authentication';

let router;

export default () => {

    router = Express.Router();
    
    /**
     * @api {post} /api/ Login
     * @apiName Login
     * @apiGroup User
     *
     * @apiParam {String} email addresss
     * @apiParam {String} account password
     *
     * @apiSuccess {Object} logged in true / false
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "loggedIn": true
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     * 
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *         "loggedIn": false
     *     }
     */
    router.post('/', (req: Express.Request, res: Express.Response) => {
        let email: string = req.body.email;
        let password: string = req.body.password;
        let rememberMe: boolean = req.body.rememberMe || false;

        if(!email || ! password || typeof(email) !== 'string' || typeof(password) !== 'string') {
            res.status(401);
        }

        Authentication.login(email, password, rememberMe, (error, token) => {
            if(error) {
                res.status(401).json({error: error});
            } else {
                res.cookie('authorization', token);
                res.status(200).json({login: 'ok', token: token});
            }
        });
    });

    /**
     * @api {post} /api/create Create Account
     * @apiName Create Account
     * @apiGroup User
     *
     * @apiParam {String} username
     * @apiParam {String} email addresss
     * @apiParam {String} account password
     *
     * @apiSuccess {Object} logged in true / false
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "created": true
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     * 
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Not Found
     *     {
     *         "error": error
     *     }
     */
    router.post('/create', (req: Express.Request, res: Express.Response) => {
        let username: string = req.body.username;
        let email: string = req.body.email;
        let password: string = req.body.password;

        if(!email || !password || !username || typeof(email) !== 'string' || typeof(password) !== 'string' || typeof(username !== 'string')) {
            res.status(401);
        }
        
        // Auth.createAccount(username, email, password, (error, token) => {
        //     if(error) {
        //         res.status(500).json({error: error});
        //     } else {
        //         res.cookie('authorization', token);
        //         res.status(200).json({created: true});
        //     }
        // }); 
    });

    /**
     * @api {get} /api/verify Verify
     * @apiName Verify
     * @apiGroup User
     *
     *
     * @apiSuccess {Object} logged in true / false
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "created": true
     *     }
     * 
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *         "error": error
     *     }
     */
    router.get('/verify', (req: Express.Request, res: Express.Response) => {
        let token = req.cookies.authorization;

        if(!token) {
            res.status(401).json({loggedIn: false});
        }

        // Auth.isLoggedIn(token, (error, valid) => {
        //     if(error) {
        //         res.status(500).json({error: error});
        //     } else {
        //         if(valid) {
        //             res.status(200).json({loggedIn: true});
        //         } else {
        //             res.status(401).json({loggedIn: false});
        //         }
                
        //     }
        // }); 
    });

    /**
     * @api {get} /api/logout Logout
     * @apiName Logout
     * @apiGroup User
     *
     *
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "loggedOut": true
     *     }
     * 
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "loggedOut": false
     *     }
     */
    router.get('/logout', (req: Express.Request, res: Express.Response) => {    
        res.cookie('authorization', {maxAge: Date.now()});
        res.status(200).json({loggedOut: true});
    });

    return router;
}
