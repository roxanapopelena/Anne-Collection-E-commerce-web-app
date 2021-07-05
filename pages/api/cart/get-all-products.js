import executeQuery from '../../../lib/db'

export default async (req, res) => {
    if (req.method === 'POST') {
        return res.status(403).json({ status: 403, payload: 'Forbidden request.' })
    }

    try {
        const products = await executeQuery({
            query: 'SELECT * FROM product'
        })

        if (!products.error && products.length) {
            return res.status(200).json({ status: 200, payload: products })
        } else {
            return res.status(500).json({ status: 500, paylaod: 'Internal server error.' })
        }
    } catch (err) {
        return res.status(500).json({ status: 500, paylaod: 'Internal server error.' })
    }
}