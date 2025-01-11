// Define types for API response
interface Resolution {
    url: string;
    resolution: string;
    quality: 'HD' | 'SD';
}

interface TwitterResponse {
    thumbnail: string;
    resolutions: Resolution[];
    text: string;
    username: string;
    statusId: string;
} 