import { BaseController } from '../baseController';

export class ServerInitaliser extends BaseController {
    public static boot() {
        
    }
}

/**
 * Order in which things should boot
 * 
 * 1. Logs
 * 2. Error handling
 * 3. Database Connection
 * 4. Website Engine Engine
 * 5. Website Routes
 *  1 Pages in Database
 *  2 Redirects 
 * 6. Admin Render Engine
 * 7. Email Template Engine
 */