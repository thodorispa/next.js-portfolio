export default async function userHandler(req, res) {  
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        if (req.user) {
          res.status(200).send({
            user: {
              _id: req.user._id,
              username: req.user.username,
              email: req.user.email,
            }
          })
        } else {
          res.status(404).send()
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send("Not allowed to register")
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}