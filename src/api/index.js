import axios from "axios";

const baseURL = "http://localhost:8000/";

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllArtist = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artists`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
        const res = axios.delete(`${baseURL}api/users/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/albums`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const changingUserRole = async (userId, role) => {
    try {
        const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
            data: { role: role },
        });
        return res;
    } catch (error) {
        return null;
    }
};

export const saveNewArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/artists`, { ...data });
        return (await res).data.artist;
    } catch (error) {
        return null;
    }
};

export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/albums`, { ...data });
        return (await res).data.album;
    } catch (error) {
        return null;
    }
};

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/songs`, { ...data });
        return (await res).data.song;
    } catch (error) {
        return null;
    }
};

export const deleteSongById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}api/songs/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};