import { Box } from '@mui/material';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface Props {
    lat: number;
    lng: number;
    height?: string | number;
}

export default function MapDisplayView({ lat, lng, height = 200 }: Props) {
    return (
        <Box
            sx={{
                height,
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                dragging={false}      // Disable dragging for display mode
                zoomControl={false}   // Hide +/- buttons for a cleaner look
                attributionControl={false} // Optional: hide leaflet link for small cards
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]} icon={DefaultIcon} />
            </MapContainer>
        </Box>
    );
}