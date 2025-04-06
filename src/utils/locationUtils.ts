
/**
 * Utility functions for handling geolocation
 */

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
};

export const checkLocationPermission = async (): Promise<'granted' | 'denied' | 'prompt'> => {
  try {
    if (!navigator.geolocation) {
      return 'denied';
    }
    
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
    return permissionStatus.state as 'granted' | 'denied' | 'prompt';
  } catch (error) {
    console.error('Error checking location permission:', error);
    return 'prompt';
  }
};

// This would usually call a geocoding API to convert coordinates to address
export const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  // In a real application, you would call a service like Google Maps Geocoding API
  // For now, we'll return a fake address for demonstration purposes
  
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dummy implementation - in real app, you'd make an API call here
  if (latitude >= 18.4 && latitude <= 18.6 && longitude >= 73.7 && longitude <= 73.9) {
    return 'Pune, Maharashtra';
  } else if (latitude >= 21.1 && latitude <= 21.2 && longitude >= 79.0 && longitude <= 79.1) {
    return 'Nagpur, Maharashtra';
  } else {
    return 'Unknown Location';
  }
};
