import _ from "lodash"
import fs from 'fs'
import PDFDocument from 'pdfkit'
import moment from 'moment'

export const generateInvoice = (
    name,
    email,
    phone,
    address1,
    address2,
    city,
    county,
    zip,
    payment_method,
    date_time,
    products
) => {
    const [itemList, totalPrice] = generateProductList(products)
    const infoObj = { name, email, phone, address1, address2, city, county, zip, payment_method, date_time, products }
    const currentDateTime = moment().format('dd-MM-yyyyTHH-mm')

    let doc = new PDFDocument({ margin: 50 })

    generateHeader(doc)
    generateCustomerInformation(doc, infoObj)
    generateInvoiceTable(doc, itemList, totalPrice)
    generateFooter(doc)

    doc.end()
    doc.pipe(fs.createWriteStream(`public/invoices/purchase-${currentDateTime}invoice.pdf`))

    return [`/invoices/purchase-${currentDateTime}invoice.pdf`, totalPrice]
}

const generateProductList = (products) => {
    const results = []
    let totalPrice = 0

    _.map(products, (it) => {
        totalPrice += it.product_price * it.amount

        results.push({
            item: it.product_name,
            quantity: it.amount,
            amount: it.product_price * it.amount
        })
    })

    return [results, totalPrice]
}

const generateHeader = (doc) => {
    doc
        //.image("/vercel.svg", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Ane Collection", 110, 57)
        .fontSize(10)
        .text("Strada", 200, 65, { align: "right" })
        .text("Oras", 200, 80, { align: "right" })
        .moveDown();
}

const generateCustomerInformation = (doc, info) => {
    doc
        .text(`Invoice Date and Time: ${info.date_time}`, 50, 215)
        .text(`Customer: ${info.name}`, 300, 200)
        .text(`Shipping Address: ${info.address1}, ${info.address2}, ${info.zip}, ${info.city}, ${info.county}`, 300, 220)
        .moveDown()
}

const generateInvoiceTable = (doc, items, total) => {
    const invoiceTableTop = 300
    let i = 0, position

    doc
        .fontSize(14)
        .text('Item Name', 50, invoiceTableTop)
        .text('Quantity', 150, invoiceTableTop)
        .text('Price', 330, invoiceTableTop)
        .text('Product Total', 420, invoiceTableTop)

    _.map(items, (it) => {
        position = invoiceTableTop + (i + 1) * 30
        console.log(it)
        generateTableRow(doc, it.item, position, it.quantity, it.amount / it.quantity, it.amount)

        i++
    })

    doc.fontSize(16).text(`Total: ${total} RON`, 50, position + 30)
}

const generateTableRow = (doc, itemName, position, quantity, price, subtotal) => {
    doc
        .fontSize(10)
        .text(itemName, 50, position)
        .text(`x${quantity}`, 150, position)
        .text(`${price} RON`, 280, position, { width: 90, align: "right" })
        .text(`${subtotal} RON`, 370, position, { width: 90, align: "right" })
}

const generateFooter = (doc) => {
    doc
        .fontSize(10)
        .text(
            "Ane Collections. All rights reserved.",
            50,
            580,
            { align: "center", width: 500 }
        )
}