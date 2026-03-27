
const CLOUD_NAME = "durdslrun";
// const UPLOAD_PRESET = "connect_items";

async function uploadToCloudinary(file, upload_preset, folderName) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folderName);
    // formData.append("folder", "item_images");

    let fetchURL;
    if (file.type.startsWith("image/")) {
        fetchURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    } else if (file.type.startsWith("video/")) {
        fetchURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;
    } else {
        fetchURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;
    }

    const response = await fetch(fetchURL, {
        method: "POST",
        body: formData,
    })

    const result = await response.json();
    console.log(result);

    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    console.log(optimizedUrl);
    return optimizedUrl;

}

export default uploadToCloudinary;