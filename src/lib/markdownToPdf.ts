import axios from 'axios';

const apiKey = process.env.MARKDOWN_KEY;
const templateId = process.env.TEMPLATE_ID;

export async function markdownToPdf(markdownContent : string) {
  const dataPayload = {
    markdown_content: markdownContent
  };

  const url = `https://rest.apitemplate.io/v2/create-pdf?template_id=${templateId}`;

  try {
    const response = await axios.post(url, dataPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      }
    });

    if (response.data && response.data.download_url) {
      return response.data.download_url;
    } else {
      throw new Error('No download URL in response');
    }
  } catch (error : any) {
    throw new Error(error.response?.data || error.message);
  }
}