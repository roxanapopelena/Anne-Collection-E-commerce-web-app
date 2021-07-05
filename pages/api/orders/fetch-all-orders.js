import executeQuery from '../../../lib/db'
import withSession from '../../../lib/session'

export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        return res.status(403).json({ status: 403, payload: 'Forbidden request' })
    }

    const user = req.session.get('user')

    if (!user && !user.isAdmin) {
        return res.status(403).json({ status: 403, payload: 'Forbidden request' })
    }

    try {
        const response = await executeQuery({
            query: `SELECT * FROM user_orders ORDER BY date_time DESC`
        })

        return res.status(200).json({ status: 200, payload: response })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ status: 500, payload: 'Internal server error.' })
    }
})