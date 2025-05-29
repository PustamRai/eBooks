import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  id: string;
}

export function verifyToken(token: string): AuthTokenPayload {
  if (!process.env.JWT_SECRET_KEY) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as AuthTokenPayload;

    console.log("decoded token: ", decoded);

    return decoded;
  } catch (error) {
    console.log("Error in token validation: ", error);
    throw new Error("Invalid or expired token");
  }
}
