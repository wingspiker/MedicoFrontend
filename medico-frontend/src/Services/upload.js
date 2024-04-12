import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL

export const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const t = localStorage.getItem('token');


    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${t}`
          },
    }
    

    return axios.post(url+'/api/upload', formData, config)
}