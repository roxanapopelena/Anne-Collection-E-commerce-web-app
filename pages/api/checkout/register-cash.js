import executeQuery from '../../../lib/db'
import _ from 'lodash'
import moment from 'moment'
import { generateInvoice } from '../../../components/checkout/GenerateInvoice'
import { sendMail } from '../../../components/checkout/Mailing'
import withSession from '../../../lib/session'

export default withSession(async (req, res) => {
    if (req.method === 'GET') {
        return res.status(403).json({ status: 403, payload: 'err_forbidden' })
    }

    const user = req.session.get('user')

    const { name, email, phone, address1, address2, city, county, zip } = req.body.state
    const { final_products } = req.body
    const dateTime = moment().format('DD-MM-yyyy | HH:mm')

    const entryId = '_' + Math.random().toString(36).substr(2, 30)

    const [invoiceName, total] = generateInvoice(name, email, phone, address1, address2, city, county, zip, 'CASH', dateTime, final_products)

    try {
         const insert_response = await executeQuery({
            query: `INSERT INTO user_orders (id, client_name, email, address1, address2, city, county, phone, payment_method, order_status, date_time, user_id)
                VALUES ('${entryId}', '${name}', '${email}', '${address1}, ${zip ?? ''}', '${address2 ?? 'N/A'}', '${city}', '${county}', '${phone}', 'CARD', '1', '${dateTime}', '${user.id ?? '-1'}')`
        })

        const insert_payment_response = await executeQuery({
            query: `INSERT INTO user_payments (id, user_id, transaction_date, payment_total, payment_method, invoice)
                VALUES (null, '${user.id ?? '-1'}', '${dateTime}', '${total}', 'CASH', '${invoiceName}')`
        })

        if (insert_response.error) {
            console.error(insert_response.error)

            await executeQuery({
                query: `DELETE FROM user_orders WHERE id='${entryId}'`
            })

            await executeQuery({
                query: `DELETE FROM user_payments WHERE invoice='${invoiceName}'`
            })

            return res.status(500).json({ status: 500, payload: 'Internal server error.' })
        }

        if (insert_payment_response.error) {
            console.error(insert_payment_response.error)

            await executeQuery({
                query: `DELETE FROM user_payments WHERE invoice='${invoiceName}'`
            })

            await executeQuery({
                query: `DELETE FROM user_orders WHERE id='${entryId}'`
            })

            return res.status(500).json({ status: 500, payload: 'Internal server error.' })
        }

        try {
            sendMail(email, 'Your order has been placed!', 'Your order has been placed. Please find your copy of the invoice in the attachments section', invoiceName)
        } catch (error) {
            console.error(error)
        }

        return res.status(200).json({ status: 200, payload: 'Order OK' })
    } catch (error) {
        console.error(error)

        await executeQuery({
            query: `DELETE FROM user_orders WHERE id='${entryId}'`
        })

        await executeQuery({
            query: `DELETE FROM user_payments WHERE invoice='${invoiceName}'`
        })

        return res.status(500).json({ status: 500, payload: 'Internal server error.' })
    }
})