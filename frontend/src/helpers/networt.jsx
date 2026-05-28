// This will read the API URL from an environment variable.
// It defaults to your local backend URL if the variable is not set.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5177";