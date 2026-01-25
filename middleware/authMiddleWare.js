import Jwt from 'jsonwebtoken';
const checkAuth = (req,res,next) => {
    try{
        const token = req.cookies?.token;
        // console.log(token);
        if(!token){
            return res.status(400).json({success:false,message:"Not Authrorized, login again..."});
        }
        let decode = Jwt.verify(token,process.env.JWT_KEY);
        if(!decode.id){
            return res.status(400).json({success:false,message:"Not Authrorized, login again..."});
        }
        req.user = decode.id;
        next();
    }
    catch(err){
        return res.status(500).json({success:false,message:"Not Authrorized, login again..."});
    }
}
export default checkAuth;