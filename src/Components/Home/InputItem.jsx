"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useContext } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { DestinationContext } from '../../context/DestinationContext';
import { PickupContext } from '../../context/PickupContext';

function InputItem({ type }) {
    const icon = type === 'pickup' ? faCircle : faMapMarkerAlt;
    const iconColor = type === 'pickup' ? 'text-green-500' : 'text-red-500';
    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(null);
    const { setPickup } = useContext(PickupContext);
    const { setDestination } = useContext(DestinationContext);

    useEffect(() => {
        setPlaceholder(type === 'pickup' ? 'Pickup' : 'Dropoff');
    }, [type]);

    const getLatAndLng = (place, type) => {
        const placeId = place.value.place_id;
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                if (type === 'pickup') {
                    setPickup({
                        lat,
                        lng,
                        address: place.formatted_address,
                        label: place.name
                    });
                } else {
                    setDestination({
                        lat,
                        lng,
                        address: place.formatted_address,
                        label: place.name
                    });
                }
            }
        });
    };

    return (
        <div className="flex items-center gap-2 w-full ">
            <FontAwesomeIcon icon={icon} className={`text-xl ${iconColor}`} />
            <GooglePlacesAutocomplete
                selectProps={{
                    value,
                    onChange: (place) => {
                        getLatAndLng(place, type);
                        setValue(place);
                    },onClear: () => {
                        setValue(null);
                        if (type === 'pickup') {
                            setPickup(null);
                        } else {
                            setDestination(null);
                        }
                    },
                    placeholder: placeholder,
                    isClearable: true,
                    className: 'w-full p-2 pd-40 border-[2px] border-gray-200 rounded-md',
                    components: {
                        DropdownIndicator: false,
                    }
                }}
            />
        </div>
    );
}

export default InputItem;
