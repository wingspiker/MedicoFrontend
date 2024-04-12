import axios from 'axios';

const cloudineryUrl = process.env.REACT_APP_CLOUDINERY_URL

export const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'documents');
    formData.append('api_key', '163183753378642');


    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
    }
    

    return axios.post(cloudineryUrl, formData, config)
}