import { useState, useEffect } from "react";
import AddVideo from "../components/AddVideo";
import VideosContainer from "../components/VideosContainer";

export default function Videos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            const res = await fetch("http://localhost:3001");
            const data = await res.json();

            setVideos([...data]);
        }

        getVideos();
    }, []);

    const addVideo = (video, id) => {
        video.id = id;
        setVideos([...videos, video]);
    }

    const deleteVideo = async (id) => {
        const res = await fetch(`http://localhost:3001/${id}`, {
            method: "DELETE"
        });
        await res.json();

        setVideos(videos.filter(video => video.id !== id));
    }

    const incRating = async (id) => {
        const res = await fetch(`http://localhost:3001/${id}/inc-rating`, {
            method: "PATCH"
        });
        await res.json();

        setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating + 1 }));
    }

    const decRating = async (id, rating) => {
        if (rating > 0) {
            const res = await fetch(`http://localhost:3001/${id}/dec-rating`, {
                method: "PATCH"
            });
            await res.json();

            setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating - 1 }));
        }
    }

    return (
        <>
            <AddVideo addVideo={addVideo} />
            <VideosContainer videos={videos} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
        </>
    );
}