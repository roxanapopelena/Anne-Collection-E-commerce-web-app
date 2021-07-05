import executeQuery from '../../../lib/db'

export default async (req, res) => {
    if (req.method === 'GET') {
        return res.status(403).json({ payload: 'Forbidden' })
    }

    const { entry } = req.body

    const challenge_existence = await executeQuery({
        query: `SELECT id from user_orders WHERE id='${entry}'`
    })

    if (challenge_existence.error) {
        return res.status(500).json({ payload: 'Internal server error' })
    }

    if (!challenge_existence.length) {
        return res.status(200).json({ payload: 'Entry not found.', status: 404 })
    }

    const response = await executeQuery({
        query: `UPDATE user_orders SET order_status=1 WHERE id='${req.body.entry}'`
    })

    if (response.error) {
        return res.status(500).json({ payload: 'Internal server error' })
    }

    return res.status(200).json({ payload: 'Validation OK', status: 200 })
}