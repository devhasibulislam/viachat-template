/**
 * Title: Write a program using JavaScript on UseToastMessage
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 13, June 2024
 */

"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface DataItem {
  acknowledgement: boolean;
  description: string;
}

interface ErrorData {
  data: {
    description: string;
  };
}

function useToastMessage(
  data: DataItem | null,
  error: ErrorData | null,
  loading: boolean
) {
  useEffect(() => {
    if (loading) {
      toast.loading("Please wait for the progress", { id: "react-hot-toast" });
    }

    if (data) {
      if (data.acknowledgement === true) {
        toast.success(data.description, { id: "react-hot-toast" });
      }
      if (data.acknowledgement === false) {
        toast.error(data.description, { id: "react-hot-toast" });
      }
    }

    if (error) {
      if (error.data) {
        toast.error(error.data.description, { id: "react-hot-toast" });
      }
    }
  }, [data, error, loading]);
}

export default useToastMessage;
