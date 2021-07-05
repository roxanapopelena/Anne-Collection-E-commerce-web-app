import executeQuery from '../../../lib/db'

export default async (req, res) => {
    if (req.method === 'POST') {
        return res.status(403).json({ status: 403, message: 'Forbidden request.' })
    }

    const response = await executeQuery({
        query: 'SELECT * FROM product'
    })

    if (response.error) {
        console.error(response.error)
        return res.status(500).json({ status: 500, payload: response })
    }

    return res.status(200).json({ status: 200, payload: response })
}