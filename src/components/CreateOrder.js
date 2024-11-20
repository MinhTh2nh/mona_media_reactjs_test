import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCustomerInfo,
  addProductToCart,
  updateCartItem,
  removeCartItem,
  setPaymentMethod,
  setTotalOrder,
  setCashReceived,
} from "../slices/OrderSlice";
import ConfirmOrder from "./ConfirmOrder";
import { mockProducts, mockPromotions } from "../mockData/sample";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../logo/logo192.png";
import { CiTrash } from "react-icons/ci";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { customerInfo, cart, paymentMethod, cashReceived } = useSelector(
    (state) => state.order
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempSubTotal = 0;
    let tempTotal = 0;

    cart.forEach((item) => {
      tempSubTotal += item.price * item.quantity;
      const promotion = mockPromotions.find(
        (promo) => promo.code === item.promotionCode
      );
      let itemTotal = item.price * item.quantity;

      if (promotion) {
        const discount =
          promotion.type === "percentage"
            ? item.price * (promotion.value / 100)
            : promotion.value;
        itemTotal -= discount * item.quantity;
      }

      tempTotal += itemTotal;
    });

    setSubTotal(tempSubTotal);
    setTotal(tempTotal);
  }, [cart]);

  const handleAddProduct = (product) => {
    dispatch(addProductToCart(product));
    setSelectedProduct(product.name + " - $" + product.price);
  };

  const handleUpdateCartItem = (index, field, value) => {
    dispatch(updateCartItem({ index, field, value }));
  };

  const handleApplyPromotion = (index, code) => {
    const promotion = mockPromotions.find((promo) => promo.code === code);
    if (promotion) {
      const updatedCart = [...cart];
      const updatedItem = {
        ...updatedCart[index],
        promotionCode: code, 
      };
      updatedCart[index] = updatedItem; 
      dispatch(updateCartItem({ index, field: "promotionCode", value: code }));
    } else {
      const updatedCart = [...cart];
      const updatedItem = {
        ...updatedCart[index],
        promotionCode: "", 
      };
      updatedCart[index] = updatedItem; 
      dispatch(updateCartItem({ index, field: "promotionCode", value: "" }));
    }
    setSelectedPromotion(code);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cashReceived < total && paymentMethod === "cash") {
      alert("Vui lòng nhập số tiền lớn hơn hoặc bằng hóa đơn");
      return;
    }
    setShowConfirmModal(true);
    dispatch(setTotalOrder(total)); 
  };


  const cartProductIds = new Set(cart.map((item) => item.id));

  return (
    <div className="font-karla bg-gray-100 min-h-screen">
      <ToastContainer />
      <nav className="w-full bg-white shadow-md sticky mb-6">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 w-8" alt="Logo" />
          </Link>
          <div>
            <ul className="flex space-x-6 text-green-600 font-medium">
              <li>
                <Link to="/" className="hover:underline">
                  HOME / CHECKOUT PAGE
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mx-5">
        <form>
          {/* Thông tin khách hàng và thông tin mua sắm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-5">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-lg font-bold text-green-600 mb-4">THÔNG TIN KHÁCH HÀNG</h2>
              <input
                type="text"
                placeholder="Họ và tên"
                value={customerInfo.name}
                onChange={(e) =>
                  dispatch(updateCustomerInfo({ name: e.target.value }))
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-4 p-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={customerInfo.email}
                onChange={(e) =>
                  dispatch(updateCustomerInfo({ email: e.target.value }))
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-4 p-2"
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={customerInfo.phoneNumber}
                onChange={(e) =>
                  dispatch(updateCustomerInfo({ phoneNumber: e.target.value }))
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-4 p-2"
                required
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-lg font-bold text-green-600 mb-2">GIỎ HÀNG</h2>
              <div className="flex items-center mb-2">
                <span>Thêm vào giỏ hàng</span>
                <select
                  value={selectedProduct} 
                  onChange={(e) => {
                    const product = JSON.parse(e.target.value);
                    handleAddProduct(product);
                  }}
                  className="border-green-300 rounded-md focus:ring-green-500 focus:border-green-500 p-2 border-[1px] ml-3"
                >
                  <option value="">{selectedProduct}</option>
                  {mockProducts
                    .filter((product) => !cartProductIds.has(product.id))  
                    .map((product) => (
                      <option key={product.id} value={JSON.stringify(product)}>
                        {product.name} - ${product.price}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <div className="grid grid-cols-5 gap-2 border-b pb-4">
                  <h5 className="font-bold">SẢN PHẨM</h5>
                  <h5 className="text-right font-bold">SỐ LƯỢNG</h5>
                  <h5 className="text-right font-bold">ĐƠN GIÁ</h5>
                  <h5 className="text-center font-bold">MÃ KM</h5>
                  <h5 className="text-center font-bold">ACTION</h5>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-2 mb-4 transition-all duration-500 transform ease-in-out"
                    >
                      <span className="col-span-1">{item.name}</span>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateCartItem(index, "quantity", e.target.value)
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 text-right"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleUpdateCartItem(index, "price", e.target.value)
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 text-right"
                      />
                      <select
                        value={item.promotionCode || ''}
                        onChange={(e) => handleApplyPromotion(index, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 text-right"
                      >
                        <option value="" >Chọn mã khuyến mãi</option>
                        {mockPromotions.map((promo) => (
                          <option key={promo.code} value={promo.code} className="text-center">
                            {promo.code}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => dispatch(removeCartItem(index))}
                        className="bg-red-500 text-white rounded-md p-2 flex justify-center items-center hover:bg-red-600"
                      >
                        <CiTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hình thức thanh toán và tiền trả lại */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 mx-5 grid grid-cols-2 gap-2">
            <div>
              <h2 className="text-lg font-bold text-green-600 mb-4">Hình thức thanh toán</h2>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => dispatch(setPaymentMethod("cash"))}
                />
                <label htmlFor="cash" className="ml-2">
                  Tiền mặt
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => dispatch(setPaymentMethod("online"))}
                />
                <label htmlFor="online" className="ml-2">
                  Thanh toán Online
                </label>
              </div>
              {paymentMethod === "cash" && (
                <div>
                  <label htmlFor="cashReceived" className="text-sm">Tiền khách đưa:</label>
                  <input
                    type="number"
                    id="cashReceived"
                    value={cashReceived}
                    onChange={(e) => dispatch(setCashReceived(Number(e.target.value)))}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 mb-4 p-2"
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-600">TỔNG CỘNG</h2>
              <div className="flex flex-col">
                <div>
                  <p className="text-gray-600">Tổng số tiền: ${subTotal}</p>
                  <p className="text-gray-600">Tổng giá trị đơn hàng (Sau khuyến mãi): ${total}</p>
                  {cashReceived > total ? <p className="text-gray-600">Tiền thừa trả khách: ${cashReceived - total}</p> : <></>}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleConfirmOrder}
            className="bg-green-500 text-white rounded-md p-4 mt-4 hover:bg-green-600 mx-5 "
          >
            Xác nhận đơn hàng
          </button>
        </form>
      </div>
      {showConfirmModal && <ConfirmOrder onClose={() => setShowConfirmModal(false)} />}
    </div>
  );
};

export default CreateOrder;
