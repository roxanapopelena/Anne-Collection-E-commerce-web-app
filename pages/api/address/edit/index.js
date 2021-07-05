import executeQuery from '../../../../lib/db'

export default async (req, res) => {
    
	const { id, user_address1, user_address2, user_city, user_county, user_postcode, address_id  } = req.body
    try {
    const response = await executeQuery({
		query: `UPDATE user_addresses SET address1 ='${user_address1}', address2='${user_address2}', city='${user_city}', county='${user_county}', postcode='${user_postcode}' WHERE user_id='${id}' AND id='${address_id}'`
	})
    
		return res.status(200).json({ status: 200, payload: 'Address updated successfuly' })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: 'Internal server error.' })
}