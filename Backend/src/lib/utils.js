import jwt from 'jsonwebtoken'

export const generate_jwt_token = (userId, res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="Development"
    });
    return token;
}

export const trimVariable = (data)=>{
    return data?data.trim():'';
}