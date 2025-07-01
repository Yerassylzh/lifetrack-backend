import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { SessionPayload, TokenUser } from "../types/session";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(user: TokenUser): Promise<string> {
  const duration = 365 * 24 * 60 * 60 * 1000;
  const expires = Date.now() + duration;
  const payload = {
    user: user,
    expires: expires,
  } as SessionPayload;

  const token = new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.expires))
    .sign(encodedKey);

  return token;
}

export async function decryptToken(
  session: string
): Promise<SessionPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch (err) {
    return undefined;
  }
}
