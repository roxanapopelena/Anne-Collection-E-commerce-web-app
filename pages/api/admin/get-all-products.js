import withSession from '../../../lib/session'
import executeQuery from '../../../lib/db'

export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        return res.status(403).json({ status: 403, payload: 'Forbidden request.' })
    }

    const user = req.session.get('user')

    console.log(user)

    if (!user || !user.isAdmin) {
        return res.status(403).json({ status: 403, payload: 'Forbidden request.' })
    }

    const response = await executeQuery({
        query: `SELECT product_categories.id as 'category_id', product.id as 'product_id', product_name, product_desc, product_price, stock, product_categories.name AS 'category_name'
        FROM product 
        JOIN product_categories ON product.category_id=product_categories.id`
    })

    if (response.error) {
        console.error(response.error)
        return res.status(500).json({ status: 500, payload: 'Internal server error.' })
    }

    return res.status(200).json({ status: 200, payload: response })
})