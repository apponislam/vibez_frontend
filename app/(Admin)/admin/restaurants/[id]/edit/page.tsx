"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, Save, X, Image as ImageIcon, AlertCircle, Clock } from "lucide-react";
import { useGetRestaurantByIdQuery, useUpdateRestaurantByAdminMutation } from "@/redux/features/admin/adminRestaurantApi";
import { getImageUrl } from "@/lib/utils";
import { toast } from "sonner";
import Swal from "sweetalert2";

// Constants & Types for Schedule Editor
type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
type Slot = "Lunch" | "Dinner";

interface SlotTimes {
    openTime: string;
    closeTime: string;
}

interface DaySlotData {
    enabled: boolean;
    times: SlotTimes;
}

type DaySlotsState = Record<Day, Record<Slot, DaySlotData>>;

const ALL_DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_MAP: Record<string, Day> = {
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    SUNDAY: "Sun",
};
const DAY_REVERSE_MAP: Record<Day, string> = {
    Mon: "MONDAY",
    Tue: "TUESDAY",
    Wed: "WEDNESDAY",
    Thu: "THURSDAY",
    Fri: "FRIDAY",
    Sat: "SATURDAY",
    Sun: "SUNDAY",
};

const SLOT_DEFAULTS: Record<Slot, { apiType: string; openTime: string; closeTime: string }> = {
    Lunch: { apiType: "LUNCH", openTime: "11:00", closeTime: "15:00" },
    Dinner: { apiType: "DINNER", openTime: "17:00", closeTime: "22:00" },
};

const SLOT_NAMES: Slot[] = ["Lunch", "Dinner"];

function createDefaultDaySlotsState(): DaySlotsState {
    const state: Partial<DaySlotsState> = {};
    ALL_DAYS.forEach((day) => {
        state[day] = {
            Lunch: { enabled: false, times: { openTime: SLOT_DEFAULTS.Lunch.openTime, closeTime: SLOT_DEFAULTS.Lunch.closeTime } },
            Dinner: { enabled: false, times: { openTime: SLOT_DEFAULTS.Dinner.openTime, closeTime: SLOT_DEFAULTS.Dinner.closeTime } },
        };
    });
    return state as DaySlotsState;
}

function isValid24hTime(time: string): boolean {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time);
}

// RESTAURANT TYPE & CUISINE CONSTANTS
const RESTAURANT_TYPES = [
    { label: "Restaurant", value: "RESTAURANT" },
    { label: "Bar", value: "BAR" },
    { label: "Bistro", value: "BISTRO" },
    { label: "Cafe", value: "CAFE" },
    { label: "Bakery", value: "BAKERY" },
];

const CUISINE_TYPES = [
    { label: "American", value: "AMERICAN" },
    { label: "Italian", value: "ITALIAN" },
    { label: "Swiss Cuisine", value: "SWISS_CUISINE" },
    { label: "Indian", value: "INDIAN" },
    { label: "Chinese", value: "CHINESE" },
    { label: "Thai", value: "THAI" },
    { label: "Vietnamese", value: "VIETNAMESE" },
    { label: "Turkish", value: "TURKISH" },
    { label: "Mexican", value: "MEXICAN" },
];

const FOOD_TYPES = [
    { label: "Pizza", value: "PIZZA" },
    { label: "Burger", value: "BURGER" },
    { label: "Sushi", value: "SUSHI" },
    { label: "Pasta", value: "PASTA" },
    { label: "Meat", value: "MEAT" },
    { label: "Fish", value: "FISH" },
    { label: "Seafood", value: "SEAFOOD" },
    { label: "Kebab", value: "KEBAB" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Vegetarian", value: "VEGETARIAN" },
];

export default function EditRestaurantPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const { data: restaurantRes, isLoading: isLoadingRestaurant, error } = useGetRestaurantByIdQuery(id);
    const [updateRestaurant, { isLoading: isUpdating }] = useUpdateRestaurantByAdminMutation();

    const restaurant = restaurantRes?.data;

    // Primary Form states
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [restaurantType, setRestaurantType] = useState("RESTAURANT");
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
    const [restaurantWebsite, setRestaurantWebsite] = useState("");

    // Address states
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    // Image states
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);

    // Schedule states
    const [activeDay, setActiveDay] = useState<Day>("Mon");
    const [daySlots, setDaySlots] = useState<DaySlotsState>(createDefaultDaySlotsState);

    // Pre-populate forms when restaurant details load
    useEffect(() => {
        if (restaurant) {
            setRestaurantName(restaurant.restaurantName || "");
            setRestaurantDescription(restaurant.restaurantDescription || "");
            setRestaurantType(restaurant.restaurantType || "RESTAURANT");
            setSelectedCuisines(restaurant.cuisineType || []);
            setSelectedFoodTypes(restaurant.foodType || []);
            setRestaurantWebsite(restaurant.restaurantWebsite || "");

            const addr = restaurant.restaurantAddress || {};
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setZipCode(addr.zipCode || "");
            setCountry(addr.country || "");

            if (restaurant.restaurantImage) {
                setImagePreview(getImageUrl(restaurant.restaurantImage));
            }

            if (restaurant.restaurantImages?.length > 0) {
                const previews = restaurant.restaurantImages.map((img: string) => getImageUrl(img));
                setGalleryPreviews(previews);
            }

            // Populate schedule state
            if (restaurant.restaurantOpenHours) {
                const openHours = restaurant.restaurantOpenHours;
                const newState = createDefaultDaySlotsState();
                let firstOpenDay: Day | null = null;

                openHours.forEach((oh: any) => {
                    const uiDay = DAY_MAP[oh.day];
                    if (uiDay && oh.isOpen) {
                        if (!firstOpenDay) firstOpenDay = uiDay;
                        oh.slots?.forEach((s: any) => {
                            if (s.type === "LUNCH") {
                                newState[uiDay].Lunch = {
                                    enabled: true,
                                    times: { openTime: s.openTime || SLOT_DEFAULTS.Lunch.openTime, closeTime: s.closeTime || SLOT_DEFAULTS.Lunch.closeTime },
                                };
                            }
                            if (s.type === "DINNER") {
                                newState[uiDay].Dinner = {
                                    enabled: true,
                                    times: { openTime: s.openTime || SLOT_DEFAULTS.Dinner.openTime, closeTime: s.closeTime || SLOT_DEFAULTS.Dinner.closeTime },
                                };
                            }
                        });
                    }
                });

                setDaySlots(newState);
                setActiveDay(firstOpenDay || "Mon");
            }
        }
    }, [restaurant]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const toggleCuisine = (cuisine: string) => {
        setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]));
    };

    const toggleFoodType = (foodType: string) => {
        setSelectedFoodTypes((prev) => (prev.includes(foodType) ? prev.filter((f) => f !== foodType) : [...prev, foodType]));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setGalleryFiles((prev) => [...prev, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveGalleryPreview = (indexToRemove: number) => {
        const previewUrl = galleryPreviews[indexToRemove];
        if (previewUrl) {
            if (!previewUrl.startsWith("blob:")) {
                const baseUrl = process.env.NEXT_PUBLIC_PIC_URL || "https://vibezapi.apponislam.top";
                const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
                const originalPath = previewUrl.replace(cleanBase, "");
                setRemovedImages((prev) => [...prev, originalPath]);
            } else {
                URL.revokeObjectURL(previewUrl);
                let fileIndex = 0;
                for (let i = 0; i < indexToRemove; i++) {
                    if (galleryPreviews[i].startsWith("blob:")) {
                        fileIndex++;
                    }
                }
                setGalleryFiles((prev) => prev.filter((_, i) => i !== fileIndex));
            }
            setGalleryPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
        }
    };

    // Toggle Slot for Schedule
    const toggleSlot = (day: Day, slot: Slot) => {
        setDaySlots((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [slot]: {
                    ...prev[day][slot],
                    enabled: !prev[day][slot].enabled,
                },
            },
        }));
    };

    // Update Slot Time for Schedule
    const updateSlotTime = (day: Day, slot: Slot, field: "openTime" | "closeTime", value: string) => {
        setDaySlots((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [slot]: {
                    ...prev[day][slot],
                    times: {
                        ...prev[day][slot].times,
                        [field]: value,
                    },
                },
            },
        }));
    };

    // Schedule Validations
    const openDays = ALL_DAYS.filter((day) => daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled);
    const daysValid = openDays.length >= 1;
    const timesValid = openDays.every((day) =>
        SLOT_NAMES.every((slot) => {
            const data = daySlots[day][slot];
            if (!data.enabled) return true;
            return isValid24hTime(data.times.openTime) && isValid24hTime(data.times.closeTime);
        }),
    );

    // Save Primary Details Form
    const handleSubmitDetails = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!restaurantName.trim()) return toast.error("Restaurant name is required");
        if (!restaurantDescription.trim()) return toast.error("Description is required");
        if (selectedCuisines.length === 0) return toast.error("Select at least one cuisine type");
        if (!street.trim() || !city.trim() || !zipCode.trim() || !country.trim()) {
            return toast.error("Complete address details are required");
        }

        try {
            const formData = new FormData();
            formData.append(
                "body",
                JSON.stringify({
                    restaurantName,
                    restaurantDescription,
                    restaurantType,
                    cuisineType: selectedCuisines,
                    foodType: selectedFoodTypes,
                    restaurantWebsite,
                    restaurantAddress: {
                        street,
                        city,
                        state,
                        zipCode,
                        country,
                    },
                    removedImages,
                }),
            );

            if (imageFile) {
                formData.append("restaurantImage", imageFile);
            }

            galleryFiles.forEach((img) => {
                formData.append("restaurantImages", img);
            });

            const confirmResult = await Swal.fire({
                title: "Save Details?",
                text: "Are you sure you want to update this restaurant's general details?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#10B981",
                cancelButtonColor: "#3f3f46",
                confirmButtonText: "Yes, save details",
                background: "#171717",
                color: "#fff",
                customClass: {
                    popup: "border border-white/10 rounded-2xl",
                    confirmButton: "rounded-xl font-bold",
                    cancelButton: "rounded-xl font-bold bg-white/5 hover:bg-white/10",
                },
            });

            if (confirmResult.isConfirmed) {
                await updateRestaurant({ id, data: formData }).unwrap();
                toast.success("Restaurant details updated successfully!");
                router.push("/admin/restaurants");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update restaurant details");
        }
    };

    // Save Schedule Form
    const handleSaveSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!daysValid || !timesValid) {
            toast.error("Please enter valid operating times in 24-hour format (e.g., 08:00, 22:30) and select at least 5 working days.");
            return;
        }

        const restaurantOpenHours = ALL_DAYS.map((dayStr) => {
            const isOpen = openDays.includes(dayStr);
            const slotsToKeep = SLOT_NAMES.filter((slot) => daySlots[dayStr][slot].enabled).map((slot) => ({
                type: SLOT_DEFAULTS[slot].apiType,
                openTime: daySlots[dayStr][slot].times.openTime,
                closeTime: daySlots[dayStr][slot].times.closeTime,
            }));

            return {
                day: DAY_REVERSE_MAP[dayStr],
                isOpen,
                slots: slotsToKeep,
            };
        });

        try {
            const confirmResult = await Swal.fire({
                title: "Save Schedule?",
                text: "Are you sure you want to update this restaurant's operating schedule?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#10B981",
                cancelButtonColor: "#3f3f46",
                confirmButtonText: "Yes, save schedule",
                background: "#171717",
                color: "#fff",
                customClass: {
                    popup: "border border-white/10 rounded-2xl",
                    confirmButton: "rounded-xl font-bold",
                    cancelButton: "rounded-xl font-bold bg-white/5 hover:bg-white/10",
                },
            });

            if (confirmResult.isConfirmed) {
                await updateRestaurant({ id, data: { restaurantOpenHours } }).unwrap();
                toast.success("Operating schedule updated successfully!");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to save schedule.");
        }
    };

    if (isLoadingRestaurant) {
        return (
            <div className="flex h-[500px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
                    <p className="text-zinc-400 animate-pulse text-sm">Loading restaurant settings...</p>
                </div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="flex flex-col h-100 items-center justify-center gap-4">
                <p className="text-zinc-400">Failed to load restaurant profile settings.</p>
                <button onClick={() => router.push("/admin/restaurants")} className="flex items-center gap-2 text-[#10B981] hover:underline text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.push("/admin/restaurants")} className="p-2 hover:bg-white/5 rounded-xl border border-white/5 transition-all text-zinc-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Edit Restaurant Settings</h1>
                    <p className="text-zinc-500 text-sm mt-1">Modify restaurant profile info, address, cover images, and weekly operating schedule.</p>
                </div>
            </div>

            {/* General Profile Form */}
            <form onSubmit={handleSubmitDetails} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Info Form */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-5">
                        <h3 className="text-base font-bold text-white mb-2">Primary Details</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Name</label>
                            <input
                                type="text"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="Enter restaurant name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Type</label>
                            <select value={restaurantType} onChange={(e) => setRestaurantType(e.target.value)} className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all">
                                {RESTAURANT_TYPES.map((opt) => (
                                    <option key={opt.value} value={opt.value} className="bg-[#171717] text-white">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Website URL (Optional)</label>
                            <input
                                type="text"
                                value={restaurantWebsite}
                                onChange={(e) => setRestaurantWebsite(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</label>
                            <textarea
                                value={restaurantDescription}
                                onChange={(e) => setRestaurantDescription(e.target.value)}
                                rows={5}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600 resize-none"
                                placeholder="Write a short summary about the restaurant..."
                            />
                        </div>
                    </div>

                    {/* Cuisine Types Picker */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <div className="mb-4">
                            <h3 className="text-base font-bold text-white">Cuisine Categories</h3>
                            <p className="text-xs text-zinc-500 mt-1">Select one or more culinary tags matching the menu.</p>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {CUISINE_TYPES.map((c) => {
                                const isSelected = selectedCuisines.includes(c.value);
                                return (
                                    <button
                                        type="button"
                                        key={c.value}
                                        onClick={() => toggleCuisine(c.value)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${isSelected ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981] shadow-lg shadow-[#10B981]/5" : "bg-white/3 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Food Types Picker */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6">
                        <div className="mb-4">
                            <h3 className="text-base font-bold text-white">Food Types</h3>
                            <p className="text-xs text-zinc-500 mt-1">Select one or more food type tags matching the menu.</p>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {FOOD_TYPES.map((f) => {
                                const isSelected = selectedFoodTypes.includes(f.value);
                                return (
                                    <button
                                        type="button"
                                        key={f.value}
                                        onClick={() => toggleFoodType(f.value)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${isSelected ? "bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981] shadow-lg shadow-[#10B981]/5" : "bg-white/3 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        {f.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Image & Address */}
                <div className="space-y-6">
                    {/* Media Card */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white">Cover Image</h3>

                        <div className="relative group aspect-video rounded-xl bg-white/3 border border-dashed border-white/10 overflow-hidden flex items-center justify-center">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1.5">
                                            <Upload className="w-3.5 h-3.5" />
                                            Change Photo
                                            <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center justify-center p-6 space-y-2 text-zinc-500 hover:text-white transition-all">
                                    <ImageIcon className="w-8 h-8 stroke-1" />
                                    <span className="text-xs font-medium">Click to upload photo</span>
                                    <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                                </label>
                            )}
                        </div>
                        {/* <p className="text-[10px] text-zinc-500 text-center">Suggested resolution: 1280x720. WebP/JPEG formats supported.</p> */}
                    </div>

                    {/* Address Fields */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white">Address Details</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Street Address</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                placeholder="123 Food Street"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Zurich"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">State / Canton</label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Zurich"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Zip Code</label>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="8000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Country</label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600"
                                    placeholder="Switzerland"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white">Restaurant Gallery</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Upload Gallery Images</label>
                            <input type="file" multiple accept="image/*" onChange={handleGalleryChange} className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all placeholder-zinc-600" />
                        </div>
                        {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                                {galleryPreviews.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group bg-white/3">
                                        <img src={url} alt={`Gallery preview ${index + 1}`} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => handleRemoveGalleryPreview(index)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors" title="Remove image">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
                        <button type="submit" disabled={isUpdating} className="w-full py-3.5 rounded-xl bg-[#10B981] hover:bg-[#0da673] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isUpdating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save General Settings
                                </>
                            )}
                        </button>
                        <button type="button" onClick={() => router.push("/admin/restaurants")} disabled={isUpdating} className="w-full py-3.5 rounded-xl bg-white/3 border border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-bold transition-all disabled:opacity-50">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

            {/* Operating Schedule Section */}
            <div className="border-t border-white/5 pt-12 mt-12 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Operating Schedule</h2>
                    <p className="text-zinc-500 text-sm mt-1">Configure daily working hours and availability slots for this restaurant.</p>
                </div>

                <form onSubmit={handleSaveSchedule} className="space-y-6">
                    {/* Operating Days */}
                    <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-bold text-white">Select Working Days</h4>
                            <p className="text-xs text-zinc-500 mt-1">Choose at least 5 days (platform requirement). Click any day to configure its hours below.</p>
                        </div>

                        <div className="grid grid-cols-7 gap-3">
                            {ALL_DAYS.map((day) => {
                                const isCurrent = activeDay === day;
                                const hasActiveSlot = daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled;
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => setActiveDay(day)}
                                        className={`py-3 rounded-xl text-xs font-bold border transition-all ${isCurrent ? "ring-2 ring-[#10B981] ring-offset-2 ring-offset-[#171717] border-transparent" : ""} ${
                                            hasActiveSlot ? "bg-[#10B981] text-white border-transparent shadow-lg shadow-[#10B981]/15" : "bg-white/3 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {!daysValid && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                                <AlertCircle className="w-4 h-4" />
                                Minimum 1 working days required (currently {openDays.length} selected)
                            </p>
                        )}
                    </div>

                    {/* Active Day Slots */}
                    {activeDay && (
                        <div className="bg-[#171717] border border-white/5 rounded-2xl p-6 space-y-5">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Operating Slots for {DAY_REVERSE_MAP[activeDay]}</h4>
                                    <p className="text-xs text-zinc-500 mt-1">Toggle and configure times for Lunch / Dinner slots</p>
                                </div>
                                {daySlots[activeDay].Lunch.enabled || daySlots[activeDay].Dinner.enabled ? (
                                    <span className="bg-[#10B981]/10 text-[#10B981] text-xs font-bold px-3 py-1 rounded-full uppercase">Open</span>
                                ) : (
                                    <span className="bg-white/5 text-zinc-400 text-xs font-bold px-3 py-1 rounded-full uppercase">Closed</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {SLOT_NAMES.map((slotName) => {
                                    const slotData = daySlots[activeDay][slotName];
                                    const isEnabled = slotData.enabled;
                                    return (
                                        <div key={slotName} className={`rounded-xl border transition-all overflow-hidden bg-[#171717] ${isEnabled ? "border-[#10B981] bg-[#10B981]/5" : "border-white/5 hover:border-white/10"}`}>
                                            <button type="button" onClick={() => toggleSlot(activeDay, slotName)} className="flex items-center justify-between p-5 w-full text-left">
                                                <div>
                                                    <p className="text-sm font-bold text-white">{slotName}</p>
                                                    <p className="text-xs text-zinc-500 mt-1">{isEnabled ? `${slotData.times.openTime} – ${slotData.times.closeTime}` : "Disabled - Click to enable slot"}</p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isEnabled ? "border-[#10B981]" : "border-white/10"}`}>{isEnabled && <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />}</div>
                                            </button>

                                            {isEnabled && (
                                                <div className="px-5 pb-5 pt-0 border-t border-white/5">
                                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                                        <div>
                                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-2">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                Opens at
                                                            </label>
                                                            <input
                                                                type="time"
                                                                value={slotData.times.openTime}
                                                                onChange={(e) => updateSlotTime(activeDay, slotName, "openTime", e.target.value)}
                                                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-2">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                Closes at
                                                            </label>
                                                            <input
                                                                type="time"
                                                                value={slotData.times.closeTime}
                                                                onChange={(e) => updateSlotTime(activeDay, slotName, "closeTime", e.target.value)}
                                                                className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10B981]/50 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Schedule Actions */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            disabled={!daysValid || !timesValid || isUpdating}
                            className="py-3.5 px-6 rounded-xl bg-[#10B981] hover:bg-[#0da673] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/15 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Operating Schedule
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
