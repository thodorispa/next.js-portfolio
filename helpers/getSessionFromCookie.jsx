import * as jwt from "next-auth/jwt"

export async function getSessionFromCookie(req) {
  try {
    const isSecure = process.env.NEXTAUTH_URL?.startsWith("https://")
    const cookiePrefix = isSecure ? "__Secure-" : ""
    const sessionToken = req.cookies?.[`${cookiePrefix}next-auth.session-token`]
  
    if (!sessionToken) return null
    let decoded = null
    try {
      decoded = await jwt.decode({ secret: process.env.SECRET, token: sessionToken })
    } catch (error) {
      console.log(error)
    }
    if (!decoded) return null
    
    return {
      user: { id: decoded.user },
      expires: new Date(Number(decoded.exp) * 1000).toISOString(),
    }
  } catch {
    return null
  }
}