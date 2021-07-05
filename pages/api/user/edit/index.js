import executeQuery from '../../../../lib/db'

export default async (req, res) => {
    
	const { id, user_name,user_email  } = req.body
    try {
    const response = await executeQuery({
		query: `UPDATE user SET name ='${user_name}', email ='${user_email}' WHERE id='${id}'`
	})
    
		return res.status(200).json({ status: 200, payload: 'Details updated successfuly' })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: 'Internal server error.' })
}