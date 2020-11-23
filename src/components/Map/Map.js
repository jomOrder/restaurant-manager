import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { classnames } from './helper';

import './map.css';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
const Map = () => {
  const [address, setAddress] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleChange = address => {
    setAddress(address);
    console.log(address)
  };

  const handleSelect = address => {
    setAddress(address)
    console.log("address:", address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const handleCloseClick = () => {
    setAddress('')
    setLatitude(null)
    setLongitude(null);
  };

  return (
    <div>
      <PlacesAutocomplete
        googleCallbackName="initialize"
        onChange={handleChange}
        value={address}
        onSelect={handleSelect}
        // onError={handleError}
        shouldFetchSuggestions={address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div className="search-bar-container">
              <div className="search-input-container">
                <input
                  id=""
                  {...getInputProps({
                    placeholder: 'Search Places...',
                    className: 'search-input',
                  })}
                />
                {address.length > 0 && (
                  <button
                    className="clear-button"
                    onClick={handleCloseClick}
                  >
                    x
                  </button>
                )}
              </div>
              {suggestions.length > 0 && (
                <div id="autocomplete" className="autocomplete-container">
                  {suggestions.map(suggestion => {
                    const className = classnames('suggestion-item', {
                      'suggestion-item--active': suggestion.active,
                    });

                    return (
                      /* eslint-disable react/jsx-key */
                      <div id="autocomplete"
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <strong>
                          {suggestion.formattedSuggestion.mainText}
                        </strong>{' '}
                        <small>
                          {suggestion.formattedSuggestion.secondaryText}
                        </small>
                      </div>
                    );
                    /* eslint-enable react/jsx-key */
                  })}
                </div>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
      {errorMessage.length > 0 && (
        <div className="error-message">{errorMessage}</div>
      )}

      {((latitude && longitude) || isGeocoding) && (
        <div>
          <h3 className="geocode-result-header">Geocode result</h3>
          {isGeocoding ? (
            <div>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw spinner" />
            </div>
          ) : (
              <div>
                <div className="geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );

};

export default Map;