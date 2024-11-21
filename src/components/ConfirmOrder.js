import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../slices/OrderSlice";
import { useState, useEffect } from "react";

const ConfirmOrder = ({ onClose }) => {
  const dispatch = useDispatch();
  const { customerInfo, cart, total, paymentMethod, orderHistory } = useSelector(
    (state) => state.order
  );

  const handleConfirm = async () => {
    await dispatch(confirmOrder());
    alert("Bạn đã thanh toán thành công");
    onClose();
    console.log(
      "Order history after confirmation:",
      orderHistory.map((order, index) => ({
        index: index + 1,
        customerInfo: order.customerInfo,
        total: order.total,
        paymentMethod: order.paymentMethod,
        date: order.date,
      }))
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold text-green-600 mb-4">Confirm Your Order</h2>

        <div>
          <p><strong>Họ và tên:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Số điện thoại:</strong> {customerInfo.phoneNumber}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
          <p><strong>Total Amount:</strong> ${total}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Giỏ hàng:</h3>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} - ${item.price} x {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
