import { NextRequest, NextResponse } from 'next/server'


export function middleware(req) {
  // Call our authentication function to check the request
  const jwt = req.cookies.get('jwt')?.value


  if (!jwt) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = { 
  matcher: [
  "/api/project/upload",
  "/api/project/delete",
  "/api/project/update",
  "/api/project/create",
  "/api/collab/upload",
  "/api/collab/delete",
  "/api/collab/update",
  "/api/collab/create",
  "/api/media/update",
] }