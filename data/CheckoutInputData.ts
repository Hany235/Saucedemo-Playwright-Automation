// Interface định nghĩa cấu trúc dữ liệu thông tin giao hàng
export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    zipCode: string;
}

// Dữ liệu mặc định dùng trong test case happy path
export const validCheckoutInfo: CheckoutInfo = {
    firstName: 'Ha',
    lastName: 'Pham',
    zipCode: '10000',
};
