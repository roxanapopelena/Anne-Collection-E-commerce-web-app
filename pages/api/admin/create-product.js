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

    const { name, category, stock, price, desc } = req.body

    try {
        const response = await executeQuery({
            query: `INSERT INTO product (id, category_id, product_name, product_desc, product_price, stock) VALUES (null, '${category}', '${name}', '${desc}', '${price}', '${stock}')`,
        })

        if (response.error) {
            console.error(response.error)
            return res.status(500).json({ status: 500, payload: 'Internal Server error.' })
        }
    } catch (err) {
        console.error(err)
    }

    return res.status(200).json({ status: 200, payload: 'Save OK' })
})
