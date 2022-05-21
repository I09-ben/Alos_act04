import jwt from "jsonwebtoken";

export default class index{
  static async apiPostLogin(req, res, next) {
    try {
      let payload = {
        id: 1,
        email: "test@tes.com",
        iat: Math.floor(Date.now() / 1000),
      };
      const key = process.env.SECRET;
      console.log(key);
      let token = await index.doRequest(payload, key);
      res.json({
        status: "success",
        token: `Bearer ${token}`,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async doRequest(payload, key) {
    try {
      return new Promise(function (resolve, reject) {
        jwt.sign(
          payload,
          key,
          {
            expiresIn: "10d",
          },
          (err, token) => {
            console.log(token);
            if (token) {
              resolve(token);
            } else {
              console.log(err);
              reject(new Error("not OK"));
            }
          }
        );
      });
    } catch (error) {}
  }

  static async apiTest(req, res, next) {
    try {
      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}