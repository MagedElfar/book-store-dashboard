/* eslint-disable no-console */
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography, FormHelperText, Button, CircularProgress, Autocomplete, TextField, InputAdornment } from '@mui/material';
import L, { type LatLngExpression } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useDebounce } from 'minimal-shared/hooks';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerFieldProps {
    nameLat: string;
    nameLng: string;
    label?: string;
}

interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

function MapPickerField({ nameLat, nameLng, label }: MapPickerFieldProps) {
    const { t } = useTranslation("common");
    const { setValue, watch, formState: { errors } } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);

    // --- Search States ---
    const [searchOptions, setSearchOptions] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 600);

    const lat = watch(nameLat);
    const lng = watch(nameLng);

    const defaultCenter: LatLngExpression = [30.0444, 31.2357];
    const currentCenter: LatLngExpression = lat && lng ? [lat, lng] : defaultCenter;

    // --- Search API Call ---
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setSearchOptions([]);
                return;
            }
            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(debouncedQuery)}&accept-language=en&limit=5`
                );
                const data = await response.json();
                setSearchOptions(data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsSearching(false);
            }
        };
        fetchResults();
    }, [debouncedQuery]);

    const reverseGeocode = async (latitude: number, longitude: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
            );
            const data = await response.json();
            if (data.address) {
                const { country, city, town, village, road, suburb, house_number, neighbourhood } = data.address;
                setValue("country", country || "", { shouldDirty: true, shouldValidate: true });
                const cityValue = city || town || village || "";
                setValue("city", cityValue, { shouldDirty: true, shouldValidate: true });
                const streetParts = [road, neighbourhood, suburb, house_number].filter(Boolean);
                setValue("street_address", streetParts.join(", "), { shouldDirty: true, shouldValidate: true });
            }
        } catch (error) {
            console.error("Geocoding failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePosition = (latitude: number, longitude: number) => {
        setValue(nameLat, latitude, { shouldValidate: true, shouldDirty: true });
        setValue(nameLng, longitude, { shouldValidate: true, shouldDirty: true });
        reverseGeocode(latitude, longitude);
    };

    function MapController() {
        const map = useMap();
        useMapEvents({
            click(e) { updatePosition(e.latlng.lat, e.latlng.lng); },
        });

        useEffect(() => {
            if (lat && lng) {
                map.flyTo([lat, lng], 15);
            }
        }, [lat, lng, map]);

        return (lat && lng) ? <Marker position={[lat, lng]} icon={DefaultIcon} /> : null;
    }

    const handleLocateMe = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (position) => updatePosition(position.coords.latitude, position.coords.longitude),
            (error) => toast.error("GPS Error")
        );
    };

    const hasError = !!errors[nameLat] || !!errors[nameLng];

    return (
        <Box sx={{ mb: 2, width: '100%' }}>
            {/* Header & Locate Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {label && <Typography variant="subtitle2" fontWeight="bold">{label}</Typography>}
                    {isLoading && <CircularProgress size={16} />}
                </Box>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MyLocationIcon />}
                    onClick={handleLocateMe}
                    disabled={isLoading}
                >
                    {t("map.locateMe")}
                </Button>
            </Box>

            {/* --- Search Box --- */}
            <Autocomplete
                sx={{ mb: 1.5 }}
                options={searchOptions}
                getOptionLabel={(option) => option.display_name}
                loading={isSearching}
                onInputChange={(_, value) => setQuery(value)}
                onChange={(_, newValue) => {
                    if (newValue) {
                        updatePosition(parseFloat(newValue.lat), parseFloat(newValue.lon));
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={t("map.searchPlaceholder", "Search for an area...")}
                        size="small"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />

            <Box
                sx={{
                    height: '350px',
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: hasError ? 'error.main' : 'divider',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <MapContainer center={currentCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapController />
                </MapContainer>
            </Box>

            {hasError && (
                <FormHelperText error sx={{ px: 1 }}>
                    {String(errors[nameLat]?.message || errors[nameLng]?.message)}
                </FormHelperText>
            )}
        </Box>
    );
}

export default MapPickerField;