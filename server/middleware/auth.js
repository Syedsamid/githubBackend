import jwt from "jsonwebtoken";
import config from "config";

const JWT_SECRET = config.get("JWT_KEY");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
 
  
  const token = authHeader.split(" ")[1]; 

  try {
    const check = jwt.verify(token, JWT_SECRET); 
    console.log(check);
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ msg: "Invalid token",error:error.message });
  }
};

export default authMiddleware;
