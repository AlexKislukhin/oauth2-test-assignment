import { IUser } from "../auth";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser | null;
        }
    }
}
