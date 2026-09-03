import axios from "axios";
import dayjs from "dayjs";

import { Link } from "react-router";
import { useEffect, useState } from "react";

import logo from "../assets/images/logo.png";
import mobileLogo from "../assets/images/mobile-logo.png";
import checkoutLock from "../assets/images/icons/checkout-lock-icon.png";

import "./CheckoutPage.css";
import "./checkout-header.css";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const response = await axios.get("/api/delivery-options");
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Error fetching delivery options:", error);
      }
    };

    fetchDeliveryOptions();
  }, []);

  return (
    <>
      <div className='checkout-header'>
        <div className='header-content'>
          <div className='checkout-header-left-section'>
            <Link to='/'>
              <img className='logo' src={logo} />
              <img className='mobile-logo' src={mobileLogo} />
            </Link>
          </div>

          <div className='checkout-header-middle-section'>
            Checkout (
            <Link className='return-to-home-link' to='/'>
              3 items
            </Link>
            )
          </div>

          <div className='checkout-header-right-section'>
            <img src={checkoutLock} />
          </div>
        </div>
      </div>
      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>

        <div className='checkout-grid'>
          <div className='order-summary'>
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
              return (
                <div key={cartItem.productId} className='cart-item-container'>
                  <div className='delivery-date'>
                    Delivery date:{" "}
                    {dayjs(
                      deliveryOptions.find(
                        (option) => option.id === cartItem.deliveryOptionId,
                      ).estimatedDeliveryTimeMs,
                    ).format("dddd, MMMM D")}
                  </div>

                  <div className='cart-item-details-grid'>
                    <img
                      className='product-image'
                      src={cartItem.product.image}
                    />

                    <div className='cart-item-details'>
                      <div className='product-name'>
                        {cartItem.product.name}
                      </div>
                      <div className='product-price'>
                        ${(cartItem.product.priceCents / 100).toFixed(2)}
                      </div>
                      <div className='product-quantity'>
                        <span>
                          Quantity:{" "}
                          <span className='quantity-label'>
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className='update-quantity-link link-primary'>
                          Update
                        </span>
                        <span className='delete-quantity-link link-primary'>
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className='delivery-options'>
                      <div className='delivery-options-title'>
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((option) => {
                        return (
                          <div key={option.id} className='delivery-option'>
                            <input
                              type='radio'
                              checked={cartItem.deliveryOptionId === option.id}
                              className='delivery-option-input'
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className='delivery-option-date'>
                                {dayjs(option.estimatedDeliveryTimeMs).format(
                                  "dddd, MMMM D",
                                )}
                              </div>
                              <div className='delivery-option-price'>
                                {option.price === 0 ?
                                  "FREE Shipping"
                                : `$${(option.priceCents / 100).toFixed(2)} - Shipping`
                                }
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='payment-summary'>
            <div className='payment-summary-title'>Payment Summary</div>

            <div className='payment-summary-row'>
              <div>Items (3):</div>
              <div className='payment-summary-money'>$42.75</div>
            </div>

            <div className='payment-summary-row'>
              <div>Shipping &amp; handling:</div>
              <div className='payment-summary-money'>$4.99</div>
            </div>

            <div className='payment-summary-row subtotal-row'>
              <div>Total before tax:</div>
              <div className='payment-summary-money'>$47.74</div>
            </div>

            <div className='payment-summary-row'>
              <div>Estimated tax (10%):</div>
              <div className='payment-summary-money'>$4.77</div>
            </div>

            <div className='payment-summary-row total-row'>
              <div>Order total:</div>
              <div className='payment-summary-money'>$52.51</div>
            </div>

            <button className='place-order-button button-primary'>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
