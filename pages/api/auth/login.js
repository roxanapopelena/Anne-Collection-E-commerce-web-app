import withSession from "../../../lib/session";
import executeQuery from "../../../lib/db";
import { compare } from 'bcrypt'

export default withSession(async (req, res) => {
	/*const { username } = await req.body;
	const url = `https://api.github.com/users/${username}`;
  
	try {
	  const response = await axios.get(url)
	  const { login, avatar_url } = response.data
  
	  const user = { isLoggedIn: true, login, avatar_url }
	  req.session.set('user', user)
	  await req.session.save()
  
	  return res.json(user)
	} catch (error) {
	  console.log(error)
	  return res.status(500).json({status: 500, payload: 'err_internal_server'})
	}*/

	if (req.method === 'GET') {
        return res.status(403).json({ status: 403, payload: 'err_forbidden' })
    } 
	const { username, password } = req.body

	const user = await executeQuery({
		query: `SELECT * FROM user WHERE username='${username}'`
	})

	if (user.length == 0) {
		return res.status(200).json({ payload: 'err_user_not_found', status: 404 })
	}

	compare(password, user[0].password, async function(err, result) {
		if (result && !err) {
			const claim = {
				username: user[0].username,
				id: user[0].id,
				name: user[0].name,
				isAdmin: user[0].is_admin,
			}

			req.session.set('user', claim)
			await req.session.save()

			return res.status(200).json(claim)
		} else {
			return res.status(200).json({ status: 404, payload: 'err_wrong_password' })
		}
	})
});