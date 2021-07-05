import executeQuery from '../../../lib/db'

export default async (req, res) => {
    
	const { id } = req.query
    try {
    const response = await executeQuery({
		query: `SELECT id, address1, address2, city, county, postcode, user_id FROM user_addresses WHERE user_id='${id}'`
	})
    
		return res.status(200).json({ status: 200, payload: response })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: 'Internal server error.' })
}