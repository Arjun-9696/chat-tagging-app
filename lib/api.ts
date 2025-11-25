export async function fetchSuggestionsAPI(q: string): Promise<string[]> {
  try {
    const res = await fetch(`/api/tags?q=${encodeURIComponent(q)}`);
    if (!res.ok) return [];
    const j = await res.json();
    return j.data || [];
  } catch (err) {
    console.error('Suggestion API Error:', err);
    return [];
  }
}
