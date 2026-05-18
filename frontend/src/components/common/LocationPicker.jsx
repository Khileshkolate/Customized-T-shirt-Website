import { useMemo, useState } from 'react';
import { Crosshair, ExternalLink, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const formatCoord = (value) => (
  typeof value === 'number' ? value.toFixed(6) : ''
);

const buildMapUrls = (location) => {
  const lat = Number(location?.latitude);
  const lng = Number(location?.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  const delta = 0.01;
  const bbox = [
    lng - delta,
    lat - delta,
    lng + delta,
    lat + delta
  ].join('%2C');

  return {
    embedUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`,
    openUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`
  };
};

const reverseGeocode = async ({ latitude, longitude }) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const address = data.address || {};

    return {
      displayName: data.display_name || '',
      city: address.city || address.town || address.village || address.suburb || '',
      state: address.state || '',
      zipCode: address.postcode || ''
    };
  } catch {
    return null;
  }
};

const LocationPicker = ({ value, onChange, disabled = false, compact = false }) => {
  const [detecting, setDetecting] = useState(false);
  const mapUrls = useMemo(() => buildMapUrls(value), [value]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Live location is not supported in this browser');
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          capturedAt: new Date().toISOString()
        };
        const address = await reverseGeocode(location);

        onChange({
          ...location,
          address
        });
        setDetecting(false);
        toast.success(address?.displayName ? 'Live location and address detected' : 'Live location detected');
      },
      (error) => {
        setDetecting(false);
        const message = error.code === error.PERMISSION_DENIED
          ? 'Allow location access to use live location'
          : 'Could not detect live location';
        toast.error(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Map Location</h3>
            <p className="text-sm text-gray-600">
              {mapUrls
                ? `${formatCoord(value.latitude)}, ${formatCoord(value.longitude)}`
                : 'No live location saved yet'}
            </p>
          </div>
        </div>

        {!disabled && (
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={detecting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            <Crosshair className="h-4 w-4" />
            {detecting ? 'Detecting...' : mapUrls ? 'Update Live Location' : 'Add Live Location'}
          </button>
        )}
      </div>

      {mapUrls && (
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <iframe
            title="Selected map location"
            src={mapUrls.embedUrl}
            className={`${compact ? 'h-44' : 'h-64'} w-full border-0`}
            loading="lazy"
          />
          <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm">
            <span className="text-gray-600">
              Accuracy: {value.accuracy ? `${Math.round(value.accuracy)} m` : 'not available'}
            </span>
            <a
              href={mapUrls.openUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary-700 hover:text-primary-800"
            >
              Open map
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
