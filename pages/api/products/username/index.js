import executeQuery from "../../../../lib/db";

export default async (req, res) => {
  console.log(req.query.id);

  const { id } = req.query;

  try {
    const response = await executeQuery({
      query: `SELECT id, name from user`,
    });

    return res.status(200).json({ status: 200, payload: response });
  } catch (err) {
    console.error(err);
  }

  return res
    .status(500)
    .json({ status: 500, message: "Internal server error." });
};
