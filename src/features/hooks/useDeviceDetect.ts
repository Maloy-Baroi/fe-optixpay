import { useEffect, useState } from "react";

interface DeviceDetectResult {
  isMobile: boolean;
}

export default function useDeviceDetect(): DeviceDetectResult {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Set your threshold for mobile screen width, for example, 768 pixels
      const isMobileNow = window.innerWidth <= 768;
      setMobile(isMobileNow);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile };
}
