export { default } from "next-auth/middleware"

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