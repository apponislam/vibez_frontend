"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Save, Loader2, Building, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useGetMyRestaurantQuery, useUpdateMyRestaurantMutation } from "@/redux/features/restaurant/restaurantApi";
import { useToggleAllStaffLoginMutation } from "@/redux/features/staff/staffApi";
import { getImageUrl } from "@/lib/utils";

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

    //new
    { value: "FRENCH", label: "French" },
    { value: "JAPANESE", label: "Japanese" },
    { value: "SPANISH", label: "Spanish" },
    { value: "GREEK", label: "Greek" },
    { value: "LEBANESE", label: "Lebanese" },
    { value: "BRAZILIAN", label: "Brazilian" },
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

export default function SettingsPage() {
    const { data: response, isLoading: isLoadingRestaurant } = useGetMyRestaurantQuery({});
    const [updateRestaurant, { isLoading: isUpdating }] = useUpdateMyRestaurantMutation();
    const [toggleAllStaff, { isLoading: isToggling }] = useToggleAllStaffLoginMutation();

    const restaurant = response?.data;

    // Manage local globalStaffLogin state visually.
    const [globalStaffLogin, setGlobalStaffLogin] = useState(true);

    const [form, setForm] = useState({
        restaurantName: "",
        restaurantDescription: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        restaurantType: "RESTAURANT",
        restaurantWebsite: "",
    });

    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
    const [isOpenCuisine, setIsOpenCuisine] = useState(false);
    const [isOpenFoodType, setIsOpenFoodType] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
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

    useEffect(() => {
        if (restaurant) {
            setForm({
                restaurantName: restaurant.restaurantName || "",
                restaurantDescription: restaurant.restaurantDescription || "",
                street: restaurant.restaurantAddress?.street || "",
                city: restaurant.restaurantAddress?.city || "",
                state: restaurant.restaurantAddress?.state || "",
                zipCode: restaurant.restaurantAddress?.zipCode || "",
                country: restaurant.restaurantAddress?.country || "",
                restaurantType: restaurant.restaurantType || "RESTAURANT",
                restaurantWebsite: restaurant.restaurantWebsite || "",
            });
            setSelectedCuisines(restaurant.cuisineType || []);
            setSelectedFoodTypes(restaurant.foodType || []);

            if (restaurant.restaurantImage) {
                setImagePreview(getImageUrl(restaurant.restaurantImage));
            }

            if (restaurant.restaurantImages?.length > 0) {
                const previews = restaurant.restaurantImages.map((img: string) => getImageUrl(img));
                setGalleryPreviews(previews);
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

    const handleToggleAllStaff = async (checked: boolean) => {
        try {
            await toggleAllStaff({ enable: checked }).unwrap();
            setGlobalStaffLogin(checked);
            toast.success(`Global staff login ${checked ? "enabled" : "disabled"} successfully.`);
        } catch (error) {
            console.error("Failed to toggle staff:", error);
            toast.error("Failed to update global staff login.");
        }
    };

    const handleSaveRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create the JSON payload for the "body" field
        const payload = {
            restaurantName: form.restaurantName,
            restaurantDescription: form.restaurantDescription,
            restaurantType: form.restaurantType,
            cuisineType: selectedCuisines,
            foodType: selectedFoodTypes,
            restaurantWebsite: form.restaurantWebsite,
            restaurantAddress: {
                street: form.street,
                city: form.city,
                state: form.state,
                zipCode: form.zipCode,
                country: form.country,
            },
            removedImages,
        };

        const submissionData = new FormData();
        submissionData.append("body", JSON.stringify(payload));

        if (imageFile) {
            submissionData.append("restaurantImage", imageFile);
        }

        galleryFiles.forEach((img) => {
            submissionData.append("restaurantImages", img);
        });

        try {
            await updateRestaurant(submissionData).unwrap();
            toast.success("Restaurant profile updated successfully!");
        } catch (error: any) {
            console.error("Update failed:", error);
            const errorMessage = error?.data?.message || "Failed to update restaurant profile.";
            toast.error(errorMessage);
        }
    };

    if (isLoadingRestaurant) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-[#013622]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl pb-12">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage your restaurant profile and global configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Toggles & Quick Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[10px] border border-zinc-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#013622]/10 rounded-lg text-[#013622]">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-zinc-900">Security & Access</h2>
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-zinc-100">
                            <div className="pr-4">
                                <h3 className="text-sm font-semibold text-zinc-900">Global Staff Login</h3>
                                <p className="text-xs text-zinc-500 mt-1">Enable or disable portal access for all staff members at once.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" className="sr-only peer" checked={globalStaffLogin} onChange={(e) => handleToggleAllStaff(e.target.checked)} disabled={isToggling} />
                                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#013622]"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profile Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSaveRestaurant} className="space-y-8">
                        <div className="bg-white rounded-[10px] border border-zinc-100 p-8 shadow-sm space-y-8">
                            <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                                <div className="p-2 bg-[#013622]/10 rounded-lg text-[#013622]">
                                    <Building className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-zinc-900">Restaurant Profile</h2>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-3">Restaurant Banner / Image</label>
                                <div className="flex items-start gap-6">
                                    <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-zinc-200 overflow-hidden bg-zinc-50 flex flex-col items-center justify-center relative cursor-pointer hover:bg-zinc-100 transition-colors shrink-0" onClick={() => fileInputRef.current?.click()}>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />
                                                <span className="text-xs text-zinc-500 font-medium text-center px-4">Click to upload</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2 pt-2">
                                        <p className="text-sm text-zinc-600">Upload a high-quality image of your restaurant's interior or signature dish.</p>
                                        <p className="text-xs text-zinc-400">Recommended size: 800x800px. Max size: 5MB.</p>
                                        {imagePreview && (
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-[#013622] font-semibold hover:underline mt-2 inline-block">
                                                Change Image
                                            </button>
                                        )}
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Restaurant Name</label>
                                    <input
                                        required
                                        value={form.restaurantName}
                                        onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Description</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={form.restaurantDescription}
                                        onChange={(e) => setForm({ ...form, restaurantDescription: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622] resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-2">Details</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700">Type of Restaurant</label>
                                    <select value={form.restaurantType} onChange={(e) => setForm({ ...form, restaurantType: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]">
                                        {RESTAURANT_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2 relative" ref={cuisineDropdownRef}>
                                    <label className="text-sm font-semibold text-zinc-700">Cuisine Type</label>

                                    {/* Dropdown Trigger */}
                                    <div
                                        onClick={() => setIsOpenCuisine(!isOpenCuisine)}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus-within:border-[#013622] focus-within:ring-2 focus-within:ring-[#013622]/20 outline-none transition-all cursor-pointer flex justify-between items-center select-none"
                                    >
                                        <span className={`truncate ${selectedCuisines.length === 0 ? "text-zinc-400" : "text-zinc-900 font-semibold"}`}>
                                            {selectedCuisines.length === 0 ? "Select Cuisine Type" : selectedCuisines.map((val) => CUISINE_TYPES.find((c) => c.value === val)?.label).join(", ")}
                                        </span>
                                        <span className="text-zinc-500 text-xs">▼</span>
                                    </div>

                                    {/* Dropdown Options Panel */}
                                    {isOpenCuisine && (
                                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-[10px] shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
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
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer select-none transition-colors ${isSelected ? "bg-[#013622]/10 text-[#013622]" : "hover:bg-zinc-50 text-zinc-700"}`}
                                                    >
                                                        <input type="checkbox" checked={isSelected} readOnly className="accent-[#013622] w-3.5 h-3.5 rounded" />
                                                        <span>{cuisine.label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2 relative" ref={foodTypeDropdownRef}>
                                    <label className="text-sm font-semibold text-zinc-700">Food Type</label>

                                    {/* Dropdown Trigger */}
                                    <div
                                        onClick={() => setIsOpenFoodType(!isOpenFoodType)}
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus-within:border-[#013622] focus-within:ring-2 focus-within:ring-[#013622]/20 outline-none transition-all cursor-pointer flex justify-between items-center select-none"
                                    >
                                        <span className={`truncate ${selectedFoodTypes.length === 0 ? "text-zinc-400" : "text-zinc-900 font-semibold"}`}>
                                            {selectedFoodTypes.length === 0 ? "Select Food Type" : selectedFoodTypes.map((val) => FOOD_TYPES.find((f) => f.value === val)?.label).join(", ")}
                                        </span>
                                        <span className="text-zinc-500 text-xs">▼</span>
                                    </div>

                                    {/* Dropdown Options Panel */}
                                    {isOpenFoodType && (
                                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-[10px] shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
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
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer select-none transition-colors ${isSelected ? "bg-[#013622]/10 text-[#013622]" : "hover:bg-zinc-50 text-zinc-700"}`}
                                                    >
                                                        <input type="checkbox" checked={isSelected} readOnly className="accent-[#013622] w-3.5 h-3.5 rounded" />
                                                        <span>{food.label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Website / Social Media Link</label>
                                    <input
                                        value={form.restaurantWebsite}
                                        onChange={(e) => setForm({ ...form, restaurantWebsite: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-2">Location</h3>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Street Address</label>
                                    <input required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 mb-1.5">City</label>
                                        <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 mb-1.5">State</label>
                                        <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 mb-1.5">ZIP Code</label>
                                        <input required value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Country</label>
                                        <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Images */}
                            <div className="space-y-5">
                                <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-2">Gallery</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700">Restaurant Gallery Images</label>
                                    <input type="file" multiple accept="image/*" ref={galleryInputRef} onChange={handleGalleryChange} className="w-full border border-zinc-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#013622]/20 focus:border-[#013622]" />
                                </div>
                                {galleryPreviews.length > 0 && (
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                        {galleryPreviews.map((url, index) => (
                                            <div key={index} className="relative aspect-square w-full rounded-[10px] overflow-hidden border border-zinc-200 group bg-zinc-50">
                                                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => handleRemoveGalleryPreview(index)} className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors" title="Remove Image">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-4 border-t border-zinc-100">
                                <button type="submit" disabled={isUpdating} className="flex items-center gap-2 bg-[#013622] text-white px-8 py-3 rounded-[10px] font-semibold hover:bg-[#012a1a] transition-all shadow-lg shadow-[#013622]/20 disabled:opacity-50">
                                    {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
