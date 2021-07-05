import executeQuery from '../../../lib/db'

export default async (req, res) => {
	try {
		const response = await executeQuery({
			query: 'SELECT * FROM migration'
		})

		return res.status(200).json({ status: 200, payload: response })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: 'Internal server error.' })
}
