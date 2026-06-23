import api from "./axios";

export function getVouchers() {
    return api.get('/admins/vouchers');
}