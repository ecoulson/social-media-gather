export default function GetEndpoint() {
  if (process.env.NODE_ENV === "production") {
    return "https://api.adaptsolutions.tech";
  } else {
    if (process.env.REACT_APP_API_ENDPOINT) {
      return process.env.REACT_APP_API_ENDPOINT;
    }
    return "http://localhost:8080";
  }
}
