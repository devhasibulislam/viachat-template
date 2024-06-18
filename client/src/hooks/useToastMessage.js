"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

function useToastMessage(loading, data, error) {
  useEffect(() => {
    if (loading) {
      toast.loading("Please wait, the request is loading", {
        id: "react-hot-toast",
      });
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
