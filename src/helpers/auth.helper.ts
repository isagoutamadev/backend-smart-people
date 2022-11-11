import * as crypto from "crypto";
import jwt from "jsonwebtoken";

export default class AuthHelper {
    static encrypt(text?: string): string {
        const key = process.env.ENCRYPT_KEY || "";
        const digest = 'hex';

        const textMD5 = crypto.createHash('md5').update(text || "").digest(digest);
        const md5 = crypto.createHash('md5').update(key + textMD5 + key).digest(digest);
        const sha1 = crypto.createHash('sha1').update(md5).digest(digest);
        const sha256 = crypto.createHash('sha256').update(sha1).digest(digest);

        return sha256;
    }

    static jwtEncode(data: object): string {
        const key = process.env.ENCRYPT_KEY || "";
        
        return jwt.sign(data, key, {expiresIn: '30 days'});;
    }

    static jwtDecode(token: string): string | jwt.JwtPayload {
        try {
            const key = process.env.ENCRYPT_KEY || "";
            const decoded = jwt.verify(token, key);
            return decoded;
        } catch (error) {
            throw error;
        }
    }
}