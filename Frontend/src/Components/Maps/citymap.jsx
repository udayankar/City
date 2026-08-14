import { MapContainer, TileLayer } from "react-leaflet";

const CityMap = ({ center }) => {
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{height: "300px" , width: "100%" , borderRadius: "16px"}}>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </MapContainer>
    );
};

export default CityMap;