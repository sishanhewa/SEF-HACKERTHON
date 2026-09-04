import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../../lib/helpers';
import { Package } from 'lucide-react';
import './LiveMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers based on priority
const createCustomIcon = (priority, category) => {
  const color = PRIORITY_CONFIG[priority]?.color || '#3b82f6';
  const IconComponent = CATEGORY_CONFIG[category]?.icon || <Package size={18} />;
  
  // Render the Lucide React component to an HTML string
  const iconHtml = ReactDOMServer.renderToString(IconComponent);
  
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div class="marker-pin" style="background-color: ${color}; box-shadow: 0 0 10px ${color}">
             <span class="marker-emoji" style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;">${iconHtml}</span>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Component to dynamically change map view if needed
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function LiveMap({ requests }) {
  // Center of Sri Lanka
  const centerSriLanka = [7.8731, 80.7718];
  
  // Filter out requests without coordinates (for now, assign random offset if they don't have lat/lng)
  // In a real app, lat/lng would be mandatory. Here we simulate it if missing.
  const mapData = requests.map(req => {
    if (req.latitude && req.longitude) return req;
    
    // Simulate coordinates around Sri Lanka if missing
    return {
      ...req,
      latitude: centerSriLanka[0] + (Math.random() - 0.5) * 2,
      longitude: centerSriLanka[1] + (Math.random() - 0.5) * 2
    };
  });

  return (
    <div className="live-map-container glass-card">
      <div className="map-header">
        <h3>Live Disaster Map</h3>
        <span className="live-indicator"><span className="dot"></span> Live</span>
      </div>
      
      <div className="map-wrapper">
        <MapContainer 
          center={centerSriLanka} 
          zoom={7} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-md)' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {mapData.map(req => (
            <Marker 
              key={req.id} 
              position={[req.latitude, req.longitude]}
              icon={createCustomIcon(req.priority, req.category)}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <h4>{req.item_description}</h4>
                  <p><strong>District:</strong> {req.district}</p>
                  <p><strong>Needed:</strong> {req.quantity_needed} units</p>
                  <p><strong>Status:</strong> {req.status}</p>
                  <a href={`/donate?request=${req.id}`} className="btn btn-primary" style={{ padding: '0.3rem 0.5rem', fontSize: '12px', marginTop: '0.5rem', display: 'block', textAlign: 'center' }}>
                    Donate
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
