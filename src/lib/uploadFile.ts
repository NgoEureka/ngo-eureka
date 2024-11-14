export default async function uploadFile(data: any) {
    // const { data: session } = useSession();
  
    try {
      //Extract the uploaded image
      const image = data;
      //create an instance of formdata
      const formData = new FormData();
      //append the image to the formdata
      formData.append("file", image);
      //bind the upload preset recruitment(cloudinary) to the formdata
      formData.append("upload_preset", "ngoeureka");
      //Make an Api request to the_hit_times cloudinary upload endpoint
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvql4mu3f/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadedImageData = await uploadResponse.json();
  
      const imageUrl = uploadedImageData.secure_url;
  
      //print the url on console
      console.log(imageUrl);
      return imageUrl;
    } catch (e) {
      console.log(e);
    }
  }