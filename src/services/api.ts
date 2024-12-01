interface SpamDetectionRequest {
  message: string;
  model: string;
}

interface SpamDetectionResponse {
  result: string;
  confidence?: number;
}

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export async function detectSpam({ message, model }: SpamDetectionRequest): Promise<SpamDetectionResponse> {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('API URL:', apiUrl);
    if (!apiUrl) {
      throw new APIError(500, 'API URL is not configured. Please check environment variables.');
    }
    
    const response = await fetch(`${apiUrl}/detect_spam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, model }),
    });

    if (!response.ok) {
      throw new APIError(response.status, `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      result: data.is_spam ? 'Spam' : 'Not Spam',
      confidence: data.confidence
    };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, 'Failed to connect to the server. Please try again later.');
  }
}
