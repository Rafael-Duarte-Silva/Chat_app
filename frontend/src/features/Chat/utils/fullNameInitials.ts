export const fullNameInitials = (username: string | undefined): string => {
    return username
        ? username
              .split(" ")
              .map((word) => word.charAt(0).toLowerCase())
              .join("")
        : "";
};
