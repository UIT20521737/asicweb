/**
 * Fetches news articles from an external API.
 *
 * @param {string} url - Base URL of the API (e.g., 'https://api.example.com/news').
 * @param {string} type - Type of data to fetch ('summary' for list, 'full' for single article).
 * @param {string} slug - Slug of the article to fetch (only when type is 'full').
 * @returns {Promise<Array | Object>} News article(s) data or null if not found.
 */
export const fetchNewsFromApi = async (url, type = 'summary', slug = '') => {
  try {
    // Construct the API endpoint based on type and slug
    const endpoint = type === 'full' && slug ? `${url}/${slug}` : url;

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers, e.g., Authorization if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Handle 'full' type with slug
    if (type === 'full' && slug) {
      // If no article is found, return null
      if (!data) {
        return null;
      }
      return data; // Return the single article object
    }

    // Handle 'summary' type (list of articles)
    // Optionally filter out content for summaries
    const summaryData = data.map(({ content, ...rest }) => rest);
    return summaryData;

  } catch (error) {
    console.error('Error fetching news from API:', error.message);
    // Return null for single article or empty array for list to maintain compatibility
    return type === 'full' ? null : [];
  }
};