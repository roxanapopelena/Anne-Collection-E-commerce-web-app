import executeQuery from "../../../lib/db";
import withSession from '../../../lib/session'

export default withSession(async (req, res) => {
	if (req.method === 'GET') {
		return res.status(403).json({ status: 403, payload: 'Forbidden request.' })
	}

	const user = req.session.get('user')

	if (!user.isAdmin) {
		return res.status(403).json({ status: 403, payload: 'Forbidden request.' })
	}

	const { id } = req.body

	try {
		const response = await executeQuery({
			query: `DELETE FROM product WHERE id='${id}'`,
		})

		if (response.error) {
			console.error(response.error)
			return res.status(500).json({ status: 500, payload: 'Internal Server error.' })
		}

        const response2 = await executeQuery({
			query: `DELETE FROM product_images WHERE product_id='${id}'`,
		})

		if (response2.error) {
			console.error(response2.error)
			return res.status(500).json({ status: 500, payload: 'Internal Server error.' })
		}

		return res.status(200).json({ status: 200, payload: 'Deletion OK' })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: "Internal server error." })
})
