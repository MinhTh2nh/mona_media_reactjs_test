const mockProducts = [
    { id: 1, name: "Product A", price: 100, stock: 10 },
    { id: 2, name: "Product B", price: 200, stock: 10 },
    { id: 3, name: "Product C", price: 300, stock: 10 },
    { id: 4, name: "Product D", price: 200, stock: 10 },
    { id: 5, name: "Product E", price: 200, stock: 10 },
    { id: 6, name: "Product F", price: 100, stock: 10 },
];

const mockPromotions = [
    {  id: 1, code: "DISCOUNT10", type: "amount", value: 10 },
    {  id: 2, code: "PERCENT20", type: "percentage", value: 20 },
];

export { mockProducts, mockPromotions };