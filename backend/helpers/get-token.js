export default function getToken(req) {

    const authHeader = req.headers.authorization;
    //to separate token of bearer
    const token = authHeader.split(" ")[1];
    return token;
}