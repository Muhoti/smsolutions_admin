import React, { useRef, useState } from 'react';
import { FiImage, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { apiService } from '../../services/api';

const ProjectCoverInput = ({ register, setValue, watch }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const coverUrl = watch('coverImageUrl');

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      setUploading(true);
      const response = await apiService.admin.uploadProjectImage(file);
      const url = response.data?.data?.url;
      if (!url) {
        throw new Error('Upload did not return an image URL');
      }
      setValue('coverImageUrl', url, { shouldDirty: true, shouldValidate: true });
      toast.success('Cover image uploaded');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to upload image';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="project-cover-url">Cover image</label>
      <div className="adm-input-with-icon">
        <input
          id="project-cover-url"
          type="text"
          {...register('coverImageUrl')}
          placeholder="Paste image URL or upload"
        />
        <button
          type="button"
          className="adm-input-icon-btn"
          onClick={handlePickImage}
          disabled={uploading}
          aria-label="Upload cover image"
          title="Upload image"
        >
          {uploading ? <FiLoader size={18} className="spinner" /> : <FiImage size={18} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="adm-file-input-hidden"
          onChange={handleFileChange}
        />
      </div>
      {coverUrl && (
        <div className="adm-cover-preview">
          <img src={coverUrl} alt="Cover preview" />
        </div>
      )}
    </div>
  );
};

export default ProjectCoverInput;
