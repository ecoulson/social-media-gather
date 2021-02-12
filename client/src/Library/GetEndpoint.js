export default function GetEndpoint() {
  if (process.env.NODE_ENV === "production") {
    return "https://api.adaptsolutions.tech";
  } else {
    return "http://localhost:8080";
  }
}
