import { deleteCookie } from "cookies-next";

export default async function userHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'POST': {
      deleteCookie('jwt', { req, res });
      res.status(200).send();
      break
    }
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}


