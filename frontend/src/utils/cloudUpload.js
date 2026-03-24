
const CLOUD_NAME = "durdslrun";
// const UPLOAD_PRESET = "connect_items";

async function uploadToCloudinary(file, upload_preset, folderName) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folderName);
    // formData.append("folder", "item_images");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
    })

    const result = await response.json();

    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    console.log(optimizedUrl);
    return optimizedUrl;

}

export default uploadToCloudinary;