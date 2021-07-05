import executeQuery from '../../../lib/db'
import { hash, genSalt } from 'bcrypt'

export default async (req, res) => {
    if (req.method === 'GET') {
        return res.status(403).json({ status: 403, payload: 'err_forbidden' })
    }

    const { firstName, lastName, username, email, password } = req.body

    console.log(firstName, lastName,username, email, password)

    const email_challenge = await executeQuery({
        query: `SELECT email FROM user WHERE email='${email}'`
    })
    const username_challenge = await executeQuery({
        query: `SELECT username FROM user WHERE username='${username}'`
    })

    if (email_challenge.length) {
        return res.status(200).json({ status: 409, payload: 'Email already in use' })
    }
    else if (username_challenge.length) {
        return res.status(200).json({ status: 409, payload: 'Username already in use' })
    }

    genSalt(12, function(err, salt) {
        if (!err) {
            hash(password, salt, async function(err, hash) {
                if (!err) {
                    const response = await executeQuery({
                        query: `INSERT INTO user (id, name, username, email, password, is_admin) VALUES (null, '${firstName} ${lastName}', '${username}', '${email}', '${hash}', '0')`
                    })

                    console.log(response)

                    if (response.error) {
                        return res.status(500).json({status: 500, payload: 'err_cannot_create_user'})
                    }
                }
            })
        }
})

    return res.status(200).json({ payload: 'User created successfully', status: 200 })
}