import React from 'react'
import { CartContext } from './CartProvider'
import { getTotalSum } from './CartProvider'

const CartTotal = ({ products }) => {
    const { state: items } = React.useContext(CartContext)
    const totalSum = getTotalSum(products, items)

    return (
        <h1>{totalSum}</h1>
    )
}

export default CartTotal