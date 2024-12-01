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
    // Hardcode the API URL temporarily to debug
    const apiUrl = 'https://spam-email-detection-7te5.onrender.com';
    console.log('Using API URL:', apiUrl); // Debug log
    
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
