import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const{token} = req.headers;
    if(!token){
        return res.json({success:false, message: "Lỗi, đăng nhập lại!"});
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Lỗi!"});
    }
}

export default authMiddleware;