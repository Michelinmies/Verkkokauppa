import React, { useReducer } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';


const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: 'Roses',
      price: 10.99,
      image: 'https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_1280.jpg',
    },
    {
      id: 2,
      name: 'Lilies',
      price: 12.99,
      image: 'https://cdn.pixabay.com/photo/2018/10/21/19/23/flower-3763573_1280.jpg',
    },
    {
      id: 3,
      name: 'Tulips',
      price: 8.99,
      image: 'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg',
    },
    {
      id: 4,
      name: 'Sunflowers',
      price: 9.99,
      image: 'https://cdn.pixabay.com/photo/2018/07/15/19/02/sunflower-3540266_1280.jpg',
    },
    {
      id: 5,
      name: 'Daisies',
      price: 6.99,
      image: 'https://cdn.pixabay.com/photo/2013/07/11/18/34/daisy-144677_1280.jpg',
    },
    {
      id: 6,
      name: 'Orchids',
      price: 14.99,
      image: 'https://cdn.pixabay.com/photo/2018/01/21/20/25/flower-3097458_1280.jpg',
    },
    {
      id: 7,
      name: 'Carnations',
      price: 7.99,
      image: 'https://cdn.pixabay.com/photo/2016/06/30/12/29/carnation-1488929_1280.jpg',
    },
    {
      id: 8,
      name: 'Hydrangeas',
      price: 11.99,
      image: 'https://cdn.pixabay.com/photo/2016/11/23/00/36/hydrangeas-1851481_1280.jpg',
    },
    {
      id: 9,
      name: 'Peonies',
      price: 13.99,
      image: 'https://cdn.pixabay.com/photo/2018/09/07/12/45/flower-3660613_1280.jpg',
    },
  ];
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Check if the product is already in the cart
        const existingCartItem = state.items.find((item) => item.id === action.payload.id);
        if (existingCartItem) {
          // If the product is already in the cart, increase the quantity
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          // If the product is not in the cart, add it with a quantity of 1
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
          };
        }
      case 'REMOVE_FROM_CART':
        // Remove the item with the specified ID from the cart
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      case 'CLEAR_CART':
        // Clear all items from the cart
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  };

  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const handleAddToCart = (product) => {
    // Add the product to the cart
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleRemoveFromCart = (productId) => {
    // Remove the product from the cart
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleClearCart = () => {
    // Clear all items from the cart
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <Container>
      <h1 className="text-center mb-5">Our Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} style={{ objectFit: 'cover', height: '200px' }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-5" style={{ boxShadow: '0 0 5px 2px rgba(211, 211, 211', padding: '20px', }}>
  {cart.items.length > 0 ? (
    <>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}{' '}
            <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
          </li>
        ))}
      </ul>
      <h3>Total: ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
      <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button>
    </>
  ) : (
    <p>Your cart is empty.</p>
  )}
</div>

            </Container>
            );
        };

export default ProductPage;