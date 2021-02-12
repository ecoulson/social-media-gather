export default function GetEndpoint() {
  if (process.env.NODE_ENV === "production") {
    return "http://api.adaptsolutions.tech";
  } else {
    return "http://localhost:8080";
  }
}
