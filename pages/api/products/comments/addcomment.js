import executeQuery from "../../../../lib/db";

export default async (req, res) => {



     //const {productId,username,comment, rating } = req.query;

     try {
       const response = await executeQuery({
         query: `INSERT INTO user (id, username, email, password, name, is_admin)
VALUES (null, 'test','test','test','test',0);`
       });

       return res.status(200).json({ status: 200, payload: response });
     } catch (err) {
       console.error(err);
     }

     console.log(comment);




  return res
    .status(500)
    .json({ status: 500, message: "Internal server error." });
};
