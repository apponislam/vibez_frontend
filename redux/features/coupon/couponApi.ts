import { baseApi } from "../../api/baseApi";

export type CouponDefaultType = "ALL" | "SELECTED" | "NONE";

export interface ISelectedPlan {
    _id: string;
    name: string;
    price?: number;
    duration?: string;
}

export interface ICoupon {
    _id: string;
    couponId: string;
    name?: string;
    percentOff?: number;
    amountOff?: number;
    currency?: string;
    duration: "once" | "repeating" | "forever";
    durationInMonths?: number;
    isDefault: boolean;
    selectedPlans?: (string | ISelectedPlan)[];
    isDirectUse: boolean;
    isActive: boolean;
    maxRedemptions?: number;
    timesRedeemed: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICouponResponse {
    success: boolean;
    message?: string;
    data: ICoupon;
}

export interface ICouponsListResponse {
    success: boolean;
    message?: string;
    data: ICoupon[];
}

export interface IDeleteCouponResponse {
    success: boolean;
    message?: string;
}

export interface IVerifyReferralResponse {
    statusCode?: number;
    success: boolean;
    message?: string;
    data?: ICoupon;
}

export const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation<ICouponResponse, Partial<ICoupon> & { discountType?: string; discountValue?: number | string }>({
            query: (data) => ({
                url: '/coupons',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        getCoupons: builder.query<ICouponsListResponse, void | Record<string, unknown>>({
            query: () => '/coupons',
            providesTags: ['Coupon'],
        }),
        getCouponById: builder.query<ICouponResponse, string>({
            query: (id) => `/coupons/${id}`,
            providesTags: ['Coupon'],
        }),
        updateCoupon: builder.mutation<ICouponResponse, { id: string; data: Partial<ICoupon> }>({
            query: ({ id, data }) => ({
                url: `/coupons/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Coupon'],
        }),
        deleteCoupon: builder.mutation<IDeleteCouponResponse, string>({
            query: (id) => ({
                url: `/coupons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupon'],
        }),
        verifyReferralCode: builder.mutation<IVerifyReferralResponse, { referralCode?: string; code?: string; planId?: string; subscriptionPlanId?: string }>({
            query: (data) => ({
                url: '/coupons/verify-referral',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { 
    useCreateCouponMutation, 
    useGetCouponsQuery, 
    useGetCouponByIdQuery, 
    useUpdateCouponMutation, 
    useDeleteCouponMutation,
    useVerifyReferralCodeMutation,
} = couponApi;

