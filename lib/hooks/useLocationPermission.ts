import { useEffect, useState } from "react";

export type PermissionState = "prompt" | "granted" | "denied" | "unsupported";

export function useLocationPermission() {
  const [permissionState, setPermissionState] = useState<PermissionState>("prompt");

  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionState("unsupported");
      return;
    }

    navigator.permissions
      ?.query({ name: "geolocation" as PermissionName })
      .then((result) => {
        setPermissionState(result.state as PermissionState);
        result.addEventListener("change", () => {
          setPermissionState(result.state as PermissionState);
        });
      })
      .catch(() => {
        navigator.geolocation.getCurrentPosition(
          () => setPermissionState("granted"),
          () => setPermissionState("denied")
        );
      });
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionState("granted");
          resolve(true);
        },
        () => {
          setPermissionState("denied");
          resolve(false);
        }
      );
    });
  };

  return { permissionState, requestPermission };
}
