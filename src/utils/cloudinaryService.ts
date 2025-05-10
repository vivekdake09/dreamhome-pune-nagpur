
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
}

export async function uploadToCloudinary(
  file: File,
  resourceType: 'image' | 'video' = 'image'
): Promise<CloudinaryUploadResult> {
  // Create form data for upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'default_preset');
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '');

  // Define upload URL based on resource type
  const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;
  
  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      resource_type: data.resource_type,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}
