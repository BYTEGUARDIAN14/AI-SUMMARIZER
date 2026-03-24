export async function summarizeDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const response = await fetch(`${API_URL}/api/summarize`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Summarization failed");
  }

  const data = await response.json();
  return data.summary;
}
