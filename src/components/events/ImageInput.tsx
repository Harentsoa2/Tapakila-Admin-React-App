import { useState } from 'react';
import { useNotify } from 'react-admin';
import { Box, Button, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface ImageInputProps {
    value?: string;
    onChange: (value: string) => void;
}

export const ImageInput = ({ value, onChange }: ImageInputProps) => {
    const [loading, setLoading] = useState(false);
    const notify = useNotify();

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.[0]) return;

        setLoading(true);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tapakila');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            onChange(data.secure_url);
            notify('Image téléchargée avec succès', { type: 'success' });
        } catch (error) {
            console.error('Upload error:', error);
            notify('Erreur lors du téléchargement de l\'image', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {value && (
                <Box sx={{ mb: 2 }}>
                    <img 
                        src={value}
                        alt="Event preview" 
                        style={{ 
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }} 
                    />
                </Box>
            )}
            <Button
                variant="contained"
                component="label"
                startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
                disabled={loading}
                fullWidth
            >
                {loading ? 'Téléchargement...' : 'Télécharger une image'}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </Button>
        </Box>
    );
};
