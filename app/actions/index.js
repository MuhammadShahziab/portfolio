import { toast } from "@/components/ui/use-toast";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const getData = async (currentTab) => {
  try {
    const res = await fetch(`${baseUrl}/api/${currentTab}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const addData = async (currentTab, formData) => {
  try {
    const res = await fetch(`/api/${currentTab}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
      body: JSON.stringify({ formData }), // Ensure the structure matches the backend expectations
    });

    const data = await res.json();

    if (data?.success) {
      toast({
        title: "Congratulations!",
        description: `${data?.message}`,
      });
    } else {
      toast({
        title: "Error",
        description: `${data?.message}`,
      });
    }
    return data; // Return the parsed response
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const updateData = async (currentTab, formData) => {
  try {
    const res = await fetch(`/api/${currentTab}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
      body: JSON.stringify({ formData }),
    });
    const data = await res.json();
    console.log(data, "Check update response");
    if (data?.success) {
      toast({
        title: "Congratulations!",
        description: `${data?.message}`,
      });
    } else {
      toast({
        title: "Error",
        description: `${data?.message}`,
      });
    }
    return data;
  } catch (error) {
    console.log("Error updating data:", error);
  }
};

export const deleteData = async (currentTab, id) => {
  try {
    const res = await fetch(`/api/${currentTab}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete data");
    }
    console.log(res, "Check delete response");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
