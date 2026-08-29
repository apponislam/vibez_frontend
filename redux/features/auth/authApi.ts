import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerRestaurant: builder.mutation({
            query: (formData) => ({
                url: '/auth/register-restaurant',
                method: 'POST',
                body: formData,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),
        resendOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useRegisterRestaurantMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
} = authApi;

