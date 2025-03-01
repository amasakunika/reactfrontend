import React, { useEffect } from 'react';
import {CreateOrder, GetOrders} from '../services/order-service'

function OrderManagement() {

    const [customerId, setCustomerId] = React.useState('');
    const [productId, setProductId] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [qty, setQty] = React.useState('');
    const [orders, setOrders] = React.useState('');

    const handleOrderSubmit = async (e) => {
            try {
            e.preventDefault()
            console.log("Order Submitted")

            const order = {
                customerId,
                items: [
                    {
                        productId,
                        price,
                        quantity: qty
                    }
                ]
            }
            const responce = await CreateOrder(order);
            console.log(responce.data);

        }catch(error) {
            alert(error.name)
        }
        }

        useEffect(() => {
            fetchOrders();
        },[])

        const fetchOrders = async () => {
            try{
                const orders = await GetOrders();
                console.log(orders);
                setOrders(orders);
            }catch(error){
                console.log(error);
            }
        }

    return (
        <>
            <p>Welcome to Cosmo Order Management</p>
            <h4>Create Order</h4>

            <form onSubmit={handleOrderSubmit}>
                <label htmlFor="cus_id">Customer Id</label>
                <input type='text' id='cus_id' name='cus_id' value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
                <br />
                <label htmlFor="prod_id">Product Id</label>
                <input type='text' id='prod_id' name='prod_id' value={productId} onChange={(e) => setProductId(e.target.value)} required />
                <br />
                <label htmlFor="price">Price</label>
                <input type='text' id='price' name='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                <br />
                <label htmlFor="qty">Quantity</label>
                <input type='text' id='qty' name='qty' value={qty} onChange={(e) => setQty(e.target.value)} required />
                <br />
                <input type='submit' value="Submit" />
                <br />
            </form>

            <div>
                <table>
                    <thead>

                    <tr>
                        <th>Customer ID</th>
                        <th>Product Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
<tbody>
                    { orders && orders.map(item => (


                    <tr>
                        <td>{item.id}</td>
                        <td>{item.customerId}</td>
                        
                        <td><button>Edit</button></td>
                        <td><button>View Item</button></td>
                    </tr>
                    )
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderManagement;