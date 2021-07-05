import executeQuery from '../../../lib/db'

export default async (req, res) => {
    
	const { id } = req.query
    try {
    const response = await executeQuery({
		query: `SELECT product_reviews.product_id, product_reviews.rating, product_reviews.message, product.product_name AS product_name, product_categories.name AS product_category 
        FROM product_reviews 
		LEFT JOIN product ON product_reviews.product_id=product.id 
       	LEFT JOIN product_categories ON product.category_id=product_categories.id
        WHERE product_reviews.user_id='${id}'`
	})
    
		return res.status(200).json({ status: 200, payload: response })
	} catch (err) {
		console.error(err)
	}

	return res.status(500).json({ status: 500, message: 'Internal server error.' })
}