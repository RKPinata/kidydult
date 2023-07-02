import apiUrl from "@/api-config"; 

const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch(`${apiUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Files uploaded successfully
      console.log("Files uploaded successfully.");
      const data = await response.json();
      const chattiestUsers = data.chattiestUsers; 
      return chattiestUsers;
    } else {
      console.error("Failed to upload files.");
      throw new Error("Failed to upload files.");
    }
  } catch (error) {
    console.error("An error occurred while uploading files:", error);
    throw error;
  }
};

export default uploadFiles;
