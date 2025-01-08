import React, { useContext, useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, OverlayView, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { PickupContext } from '../../context/PickupContext';
import { DestinationContext } from '../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: `${window.innerHeight - 100}px`,
  };

  const { pickup } = useContext(PickupContext);
  const { destination } = useContext(DestinationContext);
  const [map, setMap] = useState(null);

  const defaultCenter = { lat: -3.745, lng: -38.523 };
  const [center, setCenter] = useState(defaultCenter);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

  // Route calculation
  const directionRoute = useCallback(() => {
    if (pickup && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickup.lat, lng: pickup.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionRoutePoints(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [pickup, destination]);

  // Center map on pickup or destination
  useEffect(() => {
    if (pickup && map) {
      map.panTo({ lat: pickup.lat, lng: pickup.lng });
      setCenter({ lat: pickup.lat, lng: pickup.lng });
    }
    directionRoute();
  }, [pickup, map, directionRoute]);

  useEffect(() => {
    if (destination && map) {
      map.panTo({ lat: destination.lat, lng: destination.lng });
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
    directionRoute();
  }, [destination, map, directionRoute]);

  const REACT_APP_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '4d16df36e51453f6' }}
    >
      {pickup && (
        <MarkerF
          position={{ lat: pickup.lat, lng: pickup.lng }}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
        >
          <OverlayView
            position={{ lat: pickup.lat, lng: pickup.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-black font-bold rounded inline-block">
              <p className="text-[16px] w-full text-yellow-500">{pickup.label || 'Pickup'}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-black font-bold rounded inline-block">
              <p className="text-[16px] w-full text-yellow-500">{destination.label || 'Destination'}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#000',
              strokeOpacity: 0.8,
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  ) : null;
}

export default GoogleMapSection;
