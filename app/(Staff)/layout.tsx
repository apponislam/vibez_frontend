'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { currentUser, currentToken } from '@/redux/features/auth/authSlice';
import { io, Socket } from "socket.io-client";
import { Loader2 } from 'lucide-react';

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const user = useSelector(currentUser);
    const token = useSelector(currentToken);
    const [isChecking, setIsChecking] = useState(true);

    // Route guarding
    useEffect(() => {
        const localToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (!token && !localToken) {
            router.push('/login');
            return;
        }

        if (user) {
            if (user.role === 'STAFF') {
                setIsChecking(false);
            } else if (user.role === 'RESTAURANT_OWNER') {
                router.push('/dashboard');
            } else if (user.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/login');
            }
        } else {
            const localUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
            if (!localUser) {
                router.push('/login');
            }
        }
    }, [token, user, router]);

    // Socket connection
    useEffect(() => {
        if (isChecking || !user?._id) return;

        const getSocketUrl = () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (apiUrl) {
                try {
                    const url = new URL(apiUrl);
                    return url.origin;
                } catch (e) {
                    console.error("Invalid NEXT_PUBLIC_API_URL:", e);
                }
            }
            return "https://api.getvibez.app";
        };

        const socketUrl = getSocketUrl();
        console.log(`🔌 Staff attempting to connect to socket at: ${socketUrl}`);

        const socket: Socket = io(socketUrl, {
            query: {
                _id: user._id,
                restaurantId: user.restaurantId || ''
            },
            transports: ['polling', 'websocket'],
            autoConnect: true,
            reconnection: true
        });

        socket.on("connect", () => {
            console.log("🔌 Staff is now online! Socket ID:", socket.id);
        });

        socket.on("connect_error", (error: any) => {
            console.error("🔌 Staff socket connection error:", error);
        });

        return () => {
            socket.disconnect();
            console.log("❌ Staff socket disconnected");
        };
    }, [isChecking, user?._id, user?.restaurantId]);

    if (isChecking) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
            </div>
        );
    }

    return <>{children}</>;
}
