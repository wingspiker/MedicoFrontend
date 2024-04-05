import axios from 'axios';
import { development } from '../Environment/environment';

const cloudineryUrl = development.cloudineryUrl

export const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'documents');

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
    }
    

    return axios.post(cloudineryUrl + '/image/upload', formData, config)
}