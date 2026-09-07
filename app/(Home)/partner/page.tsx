"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useRegisterRestaurantMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

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

const RESTAURANT_TYPES = [
    { value: "RESTAURANT", label: "Restaurant" },
    { value: "BAR", label: "Bar" },
    { value: "BISTRO", label: "Bistro" },
    { value: "CAFE", label: "Cafe" },
    { value: "BAKERY", label: "Bakery" },
];

const CUISINE_TYPES = [
    { value: "AMERICAN", label: "American" },
    { value: "ITALIAN", label: "Italian" },
    { value: "SWISS_CUISINE", label: "Swiss Cuisine" },
    { value: "INDIAN", label: "Indian" },
    { value: "CHINESE", label: "Chinese" },
    { value: "THAI", label: "Thai" },
    { value: "VIETNAMESE", label: "Vietnamese" },
    { value: "TURKISH", label: "Turkish" },
    { value: "MEXICAN", label: "Mexican" },
];

const FOOD_TYPES = [
    { value: "PIZZA", label: "Pizza" },
    { value: "BURGER", label: "Burger" },
    { value: "SUSHI", label: "Sushi" },
    { value: "PASTA", label: "Pasta" },
    { value: "MEAT", label: "Meat" },
    { value: "FISH", label: "Fish" },
    { value: "SEAFOOD", label: "Seafood" },
    { value: "KEBAB", label: "Kebab" },
    { value: "VEGAN", label: "Vegan" },
    { value: "VEGETARIAN", label: "Vegetarian" },
];

export default function Partner() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [activeDay, setActiveDay] = useState<Day>("Mon");
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
    const [isOpenCuisine, setIsOpenCuisine] = useState(false);
    const [isOpenFoodType, setIsOpenFoodType] = useState(false);
    const cuisineDropdownRef = useRef<HTMLDivElement>(null);
    const foodTypeDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cuisineDropdownRef.current && !cuisineDropdownRef.current.contains(event.target as Node)) {
                setIsOpenCuisine(false);
            }
            if (foodTypeDropdownRef.current && !foodTypeDropdownRef.current.contains(event.target as Node)) {
                setIsOpenFoodType(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const [daySlots, setDaySlots] = useState<DaySlotsState>(() => {
        const state: Partial<DaySlotsState> = {};
        ALL_DAYS.forEach((day) => {
            state[day] = {
                Lunch: { enabled: false, times: { openTime: SLOT_DEFAULTS.Lunch.openTime, closeTime: SLOT_DEFAULTS.Lunch.closeTime } },
                Dinner: { enabled: false, times: { openTime: SLOT_DEFAULTS.Dinner.openTime, closeTime: SLOT_DEFAULTS.Dinner.closeTime } },
            };
        });
        return state as DaySlotsState;
    });

    const autocompleteInputRef = useRef<HTMLInputElement>(null);
    const autocompleteInstance = useRef<any>(null);
    const [restaurantName, setRestaurantName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setGalleryImages((prev) => [...prev, ...files]);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemovePreview = (indexToRemove: number) => {
        URL.revokeObjectURL(galleryPreviews[indexToRemove]);
        setGalleryImages((prev) => prev.filter((_, i) => i !== indexToRemove));
        setGalleryPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const previewsRef = useRef<string[]>([]);
    previewsRef.current = galleryPreviews;
    useEffect(() => {
        return () => {
            previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    const [registerRestaurant, { isLoading }] = useRegisterRestaurantMutation();

    const initAutocomplete = () => {
        if ((window as any).google && autocompleteInputRef.current && !autocompleteInstance.current) {
            const autocomplete = new (window as any).google.maps.places.Autocomplete(autocompleteInputRef.current, {
                types: ["establishment"],
            });

            autocompleteInstance.current = autocomplete;

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (place.name) {
                    setRestaurantName(place.name);
                }

                let streetNumber = "";
                let route = "";
                let locality = "";
                let stateName = "";
                let zip = "";
                let countryName = "";

                place.address_components?.forEach((component: { types: any; long_name: string; short_name: string }) => {
                    const types = component.types;
                    if (types.includes("street_number")) streetNumber = component.long_name;
                    if (types.includes("route")) route = component.long_name;
                    if (types.includes("locality")) locality = component.long_name;
                    if (types.includes("postal_town") && !locality) locality = component.long_name;
                    if (types.includes("administrative_area_level_1")) stateName = component.short_name;
                    if (types.includes("postal_code")) zip = component.long_name;
                    if (types.includes("country")) countryName = component.long_name;
                });

                setStreet(`${streetNumber} ${route}`.trim() || place.name || "");
                if (locality) setCity(locality);
                if (stateName) setState(stateName);
                if (zip) setZipCode(zip);
                if (countryName) setCountry(countryName);

                if (place.geometry && place.geometry.location) {
                    setLat(place.geometry.location.lat().toString());
                    setLng(place.geometry.location.lng().toString());
                }

                if (place.editorial_summary && place.editorial_summary.overview) {
                    setRestaurantDescription(place.editorial_summary.overview);
                } else if (place.name && locality) {
                    setRestaurantDescription(`Welcome to ${place.name}, a premier dining destination located in the heart of ${locality}.`);
                }
            });
        }
    };

    React.useEffect(() => {
        initAutocomplete();
    });

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const openDays = ALL_DAYS.filter((day) => daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled);
        const daysValid = openDays.length >= 1;

        if (selectedCuisines.length === 0) {
            toast.error("Please select at least one cuisine type.");
            return;
        }

        if (!daysValid) {
            toast.error("Please configure at least one active slot (Lunch or Dinner) for at least 1 days.");
            return;
        }

        const restaurantOpenHours = ALL_DAYS.map((dayStr) => {
            const isOpen = openDays.includes(dayStr);
            const slotsToKeep = SLOT_NAMES.filter((slot) => daySlots[dayStr][slot].enabled).map((slot) => ({
                type: SLOT_DEFAULTS[slot].apiType,
                openTime: daySlots[dayStr][slot].times.openTime,
                closeTime: daySlots[dayStr][slot].times.closeTime,
            }));

            let topOpen = "11:00";
            let topClose = "15:00";
            if (isOpen) {
                const lunchActive = daySlots[dayStr].Lunch.enabled;
                const dinnerActive = daySlots[dayStr].Dinner.enabled;
                if (lunchActive && dinnerActive) {
                    topOpen = daySlots[dayStr].Lunch.times.openTime;
                    topClose = daySlots[dayStr].Dinner.times.closeTime;
                } else if (lunchActive) {
                    topOpen = daySlots[dayStr].Lunch.times.openTime;
                    topClose = daySlots[dayStr].Lunch.times.closeTime;
                } else if (dinnerActive) {
                    topOpen = daySlots[dayStr].Dinner.times.openTime;
                    topClose = daySlots[dayStr].Dinner.times.closeTime;
                }
            }

            return {
                day: DAY_REVERSE_MAP[dayStr],
                isOpen,
                openTime: topOpen,
                closeTime: topClose,
                slots: slotsToKeep,
            };
        });

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            phone: formData.get("phone"),
            restaurantName: formData.get("restaurantName"),
            restaurantDescription: formData.get("restaurantDescription"),
            restaurantType: formData.get("restaurantType"),
            cuisineType: selectedCuisines,
            foodType: selectedFoodTypes,
            restaurantWebsite: formData.get("restaurantWebsite"),
            restaurantAddress: {
                street: formData.get("street"),
                city: formData.get("city"),
                state: formData.get("state") || "NY",
                zipCode: formData.get("zipCode") || "10001",
                country: formData.get("country") || "USA",
                lat: lat,
                lng: lng,
            },
            restaurantOpenHours,
        };

        const submissionData = new FormData();
        submissionData.append("body", JSON.stringify(payload));

        const profileImage = formData.get("profileImage") as File;
        const restaurantImage = formData.get("restaurantImage") as File;

        if (profileImage && profileImage.size > 0) {
            submissionData.append("profileImage", profileImage);
        }
        if (restaurantImage && restaurantImage.size > 0) {
            submissionData.append("restaurantImage", restaurantImage);
        }

        galleryImages.forEach((img) => {
            submissionData.append("restaurantImages", img);
        });

        try {
            const response = await registerRestaurant(submissionData).unwrap();
            toast.success("Restaurant application submitted successfully!");

            if (response.data?.user && response.data?.accessToken) {
                dispatch(
                    setUser({
                        user: response.data.user,
                        token: response.data.accessToken,
                    }),
                );
            }
            router.push("/dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY || "AIzaSyDJXC1_hT7bYHo1qQU56OOAQTjz4FPq0Ks"}&libraries=places`} strategy="afterInteractive" onLoad={initAutocomplete} />
            <div className="relative max-w-6xl mx-auto rounded-[12px] overflow-hidden group mb-12 shadow-2xl">
                <Image src="/partner.png" alt="Partner" width={1300} height={500} className="w-full h-auto object-cover" priority />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, #01362266 40%, #01362200 100%)",
                    }}
                />
                <div className="absolute top-6 left-6">
                    <span className="bg-[#CF0738] text-white text-[10px] md:text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Partner with us</span>
                </div>
            </div>

            <div className="text-center mt-20 mb-12">
                <h2 className="text-[#013622] font-bold text-4xl">Grow Your Restaurant With Us </h2>
                <p className="text-[#36654D] text-lg mt-2">Join our platform and attract more customers without extra marketing costs.</p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="p-6 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Owner Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Owner / Manager Name" name="name" placeholder="Full Name" required />
                                <FormInput label="Email Address" name="email" placeholder="contact@restaurant.com" type="email" required />
                                <FormInput label="Phone Number" name="phone" placeholder="+1 (555) 000-0000" required />
                                <FormInput label="Password" name="password" placeholder="Create a Password" type="password" required />
                                <FormInput label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" type="password" required />
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Profile Image</label>
                                    <input type="file" name="profileImage" accept="image/*" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Restaurant/Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <FormInput label="Restaurant Name" name="restaurantName" placeholder="Start typing to search for your restaurant..." required value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} inputRef={autocompleteInputRef} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Short Description</label>
                                    <textarea
                                        name="restaurantDescription"
                                        rows={4}
                                        value={restaurantDescription}
                                        onChange={(e) => setRestaurantDescription(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all resize-none"
                                        placeholder="Tell us about your restaurant's story and specialty..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <FormInput label="Restaurant Address" name="street" placeholder="Street Address" required value={street} onChange={(e) => setStreet(e.target.value)} />
                                </div>
                                <FormInput label="City" name="city" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} />
                                <FormInput label="State/Province" name="state" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)} />
                                <FormInput label="ZIP/Postal Code" name="zipCode" placeholder="ZIP Code" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                <FormInput label="Country" name="country" placeholder="Country" required value={country} onChange={(e) => setCountry(e.target.value)} />
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Type of Restaurant</label>
                                    <select name="restaurantType" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all appearance-none cursor-pointer">
                                        {RESTAURANT_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="space-y-2 relative" ref={cuisineDropdownRef}>
                                        <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Cuisine Type</label>

                                        {/* Dropdown Trigger */}
                                        <div
                                            onClick={() => setIsOpenCuisine(!isOpenCuisine)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus-within:border-[#CF0738] focus-within:ring-1 focus-within:ring-[#CF0738] outline-none transition-all cursor-pointer flex justify-between items-center select-none"
                                        >
                                            <span className={`truncate ${selectedCuisines.length === 0 ? "text-zinc-400" : "text-zinc-950 font-semibold"}`}>
                                                {selectedCuisines.length === 0 ? "Select Cuisine Type" : selectedCuisines.map((val) => CUISINE_TYPES.find((c) => c.value === val)?.label).join(", ")}
                                            </span>
                                            <span className="text-zinc-500 text-xs">▼</span>
                                        </div>

                                        {/* Dropdown Options Panel */}
                                        {isOpenCuisine && (
                                            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                                                {CUISINE_TYPES.map((cuisine) => {
                                                    const isSelected = selectedCuisines.includes(cuisine.value);
                                                    return (
                                                        <div
                                                            key={cuisine.value}
                                                            onClick={() => {
                                                                if (isSelected) {
                                                                    setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine.value));
                                                                } else {
                                                                    setSelectedCuisines([...selectedCuisines, cuisine.value]);
                                                                }
                                                            }}
                                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer select-none transition-colors ${isSelected ? "bg-[#CF0738]/5 text-[#CF0738]" : "hover:bg-zinc-50 text-zinc-700"}`}
                                                        >
                                                            <input type="checkbox" checked={isSelected} readOnly className="accent-[#CF0738] w-3.5 h-3.5 rounded" />
                                                            <span>{cuisine.label}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="space-y-2 relative" ref={foodTypeDropdownRef}>
                                        <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Food Type</label>

                                        {/* Dropdown Trigger */}
                                        <div
                                            onClick={() => setIsOpenFoodType(!isOpenFoodType)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus-within:border-[#CF0738] focus-within:ring-1 focus-within:ring-[#CF0738] outline-none transition-all cursor-pointer flex justify-between items-center select-none"
                                        >
                                            <span className={`truncate ${selectedFoodTypes.length === 0 ? "text-zinc-400" : "text-zinc-950 font-semibold"}`}>
                                                {selectedFoodTypes.length === 0 ? "Select Food Type" : selectedFoodTypes.map((val) => FOOD_TYPES.find((f) => f.value === val)?.label).join(", ")}
                                            </span>
                                            <span className="text-zinc-500 text-xs">▼</span>
                                        </div>

                                        {/* Dropdown Options Panel */}
                                        {isOpenFoodType && (
                                            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                                                {FOOD_TYPES.map((food) => {
                                                    const isSelected = selectedFoodTypes.includes(food.value);
                                                    return (
                                                        <div
                                                            key={food.value}
                                                            onClick={() => {
                                                                if (isSelected) {
                                                                    setSelectedFoodTypes(selectedFoodTypes.filter((f) => f !== food.value));
                                                                } else {
                                                                    setSelectedFoodTypes([...selectedFoodTypes, food.value]);
                                                                }
                                                            }}
                                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer select-none transition-colors ${isSelected ? "bg-[#CF0738]/5 text-[#CF0738]" : "hover:bg-zinc-50 text-zinc-700"}`}
                                                        >
                                                            <input type="checkbox" checked={isSelected} readOnly className="accent-[#CF0738] w-3.5 h-3.5 rounded" />
                                                            <span>{food.label}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Restaurant Image (Cover/Banner)</label>
                                    <input type="file" name="restaurantImage" accept="image/*" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">Restaurant Gallery Images (Multiple)</label>
                                    <input type="file" multiple accept="image/*" onChange={handleGalleryChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all" />
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-3">
                                            {galleryPreviews.map((url, index) => (
                                                <div key={index} className="relative aspect-square w-full rounded-xl overflow-hidden border border-zinc-200 group bg-zinc-50">
                                                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => handleRemovePreview(index)} className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors" title="Remove Image">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Operational Details */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Operational Details</h2>

                            {/* Day Selection Grid */}
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight block">Select Opening Days & Configure Hours</label>
                                <div className="grid grid-cols-7 gap-2">
                                    {ALL_DAYS.map((day) => {
                                        const isCurrent = activeDay === day;
                                        const hasActiveSlot = daySlots[day].Lunch.enabled || daySlots[day].Dinner.enabled;
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => setActiveDay(day)}
                                                className={`py-3 rounded-xl text-xs font-bold border transition-all ${isCurrent ? "ring-2 ring-[#CF0738] ring-offset-2 border-transparent" : ""} ${
                                                    hasActiveSlot ? "bg-[#CF0738] text-white border-transparent shadow-md" : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[11px] text-zinc-400">Days highlighted in red are open. Click any day to configure its specific Lunch and Dinner operating times below.</p>
                            </div>

                            {/* Active Day Slots Configuration */}
                            {activeDay && (
                                <div className="space-y-6 border-t pt-6 animate-in fade-in duration-200">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight block">Operating Slots & Hours for {DAY_REVERSE_MAP[activeDay]}</label>
                                        {daySlots[activeDay].Lunch.enabled || daySlots[activeDay].Dinner.enabled ? (
                                            <span className="bg-[#CF0738]/10 text-[#CF0738] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Open</span>
                                        ) : (
                                            <span className="bg-zinc-100 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Closed</span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Lunch Card */}
                                        <div className={`p-5 rounded-2xl border transition-all ${daySlots[activeDay].Lunch.enabled ? "border-[#CF0738] bg-[#CF0738]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}>
                                            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSlot(activeDay, "Lunch")}>
                                                <div>
                                                    <h4 className="text-sm font-bold text-zinc-900">Lunch Slot</h4>
                                                    <p className="text-xs text-zinc-400 mt-0.5">{daySlots[activeDay].Lunch.enabled ? `${daySlots[activeDay].Lunch.times.openTime} – ${daySlots[activeDay].Lunch.times.closeTime}` : "Tap to enable this slot"}</p>
                                                </div>
                                                <input type="checkbox" checked={daySlots[activeDay].Lunch.enabled} readOnly className="w-5 h-5 accent-[#CF0738] cursor-pointer" />
                                            </div>

                                            {daySlots[activeDay].Lunch.enabled && (
                                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-100">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-[#CF0738] uppercase tracking-tight">Opens at</label>
                                                        <input
                                                            type="time"
                                                            value={daySlots[activeDay].Lunch.times.openTime}
                                                            onChange={(e) => updateSlotTime(activeDay, "Lunch", "openTime", e.target.value)}
                                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#CF0738] outline-none transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-[#CF0738] uppercase tracking-tight">Closes at</label>
                                                        <input
                                                            type="time"
                                                            value={daySlots[activeDay].Lunch.times.closeTime}
                                                            onChange={(e) => updateSlotTime(activeDay, "Lunch", "closeTime", e.target.value)}
                                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#CF0738] outline-none transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Dinner Card */}
                                        <div className={`p-5 rounded-2xl border transition-all ${daySlots[activeDay].Dinner.enabled ? "border-[#CF0738] bg-[#CF0738]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}>
                                            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSlot(activeDay, "Dinner")}>
                                                <div>
                                                    <h4 className="text-sm font-bold text-zinc-900">Dinner Slot</h4>
                                                    <p className="text-xs text-zinc-400 mt-0.5">{daySlots[activeDay].Dinner.enabled ? `${daySlots[activeDay].Dinner.times.openTime} – ${daySlots[activeDay].Dinner.times.closeTime}` : "Tap to enable this slot"}</p>
                                                </div>
                                                <input type="checkbox" checked={daySlots[activeDay].Dinner.enabled} readOnly className="w-5 h-5 accent-[#CF0738] cursor-pointer" />
                                            </div>

                                            {daySlots[activeDay].Dinner.enabled && (
                                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-100">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-[#CF0738] uppercase tracking-tight">Opens at</label>
                                                        <input
                                                            type="time"
                                                            value={daySlots[activeDay].Dinner.times.openTime}
                                                            onChange={(e) => updateSlotTime(activeDay, "Dinner", "openTime", e.target.value)}
                                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#CF0738] outline-none transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-[#CF0738] uppercase tracking-tight">Closes at</label>
                                                        <input
                                                            type="time"
                                                            value={daySlots[activeDay].Dinner.times.closeTime}
                                                            onChange={(e) => updateSlotTime(activeDay, "Dinner", "closeTime", e.target.value)}
                                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#CF0738] outline-none transition-all cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Validation warning for number of active days */}
                            {ALL_DAYS.filter((d) => daySlots[d].Lunch.enabled || daySlots[d].Dinner.enabled).length < 1 && (
                                <p className="flex items-center gap-1.5 text-xs text-red-500 font-semibold mt-2">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Minimum 1 open days required (currently {ALL_DAYS.filter((d) => daySlots[d].Lunch.enabled || daySlots[d].Dinner.enabled).length} selected)
                                </p>
                            )}
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-[#005C2C] tracking-wide border-b pb-2 uppercase">Additional Info</h2>
                            <div className="space-y-4">
                                <FormInput label="Website / Social Media Link" name="restaurantWebsite" placeholder="https://..." />
                            </div>
                        </section>

                        {/* Terms and Submit */}
                        <div className="space-y-8 pt-6">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-5 h-5 rounded-md border-zinc-300 text-[#CF0738] focus:ring-[#CF0738] cursor-pointer" id="terms" required />
                                <label htmlFor="terms" className="text-sm text-zinc-600">
                                    I agree to the{" "}
                                    <a href="/terms" className="text-[#013622] underline font-medium">
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="/policy" className="text-[#013622] underline font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <button type="submit" disabled={isLoading} className="w-full bg-[#CF0738] text-white font-bold py-4 rounded-xl shadow-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]">
                                {isLoading ? "Submitting..." : "Submit Partnership Request"}
                            </button>

                            <p className="text-center text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">© No Commission. No Hidden Fees.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function FormInput({ label, name, placeholder, type = "text", required = false, value, onChange, inputRef }: { label: string; name: string; placeholder: string; type?: string; required?: boolean; value?: string; onChange?: (e: any) => void; inputRef?: any }) {
    return (
        <div className="space-y-2">
            <label className="text-[13px] font-bold text-zinc-700 uppercase tracking-tight">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                ref={inputRef}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#CF0738] focus:ring-1 focus:ring-[#CF0738] outline-none transition-all"
            />
        </div>
    );
}
