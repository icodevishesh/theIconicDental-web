// const API_BASE = process.env.NODE_ENV === 'production'
//   ? 'http://localhost:8000/api'
//   : '/.netlify/functions';

// http://localhost:8000
// .netlify/functions
// production   development

const API_BASE = '/api'

// const API_BASE = 'http://localhost:8000/api';

const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
if (!accessToken) {
  console.error('NEXT_PUBLIC_ACCESS_TOKEN environment variable is required');
}


export const submitContactForm = async (formData) => {
  const response = await fetch(`${API_BASE}/submit-form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to submit form';
    try {
      const error = await response.json();
      errorMessage = error.error || error.message || errorMessage;
    } catch {
      // response body was not valid JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};


export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE}/blog`, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken,
    },
  });
  return response.json();
};

export const fetchPosition = async (status) => {
  try {
    const response = await fetch(`${API_BASE}/position?status=${encodeURIComponent(status)}`, {
      headers: {
        'access-token': accessToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch position: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching position:', error);
    throw error;
  }
};


export const fetchPositionById = async (id) => {
  try {
    console.log('Fetching position with ID:', id);
    const response = await fetch(`${API_BASE}/position/${id}`, {
      headers: {
        'access-token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    // First get the response text to debug
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    try {
      const data = JSON.parse(responseText);
      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch position: ${response.statusText}`);
      }
      return data;
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 100)}...`);
    }
  } catch (error) {
    console.error('Error in fetchPositionById:', error);
    throw error;
  }
};


export const fetchPositions = async () => {
  try {
    const response = await fetch(`${API_BASE}/position`, {
      headers: {
        'access-token': accessToken,
      },
    }); // 
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch positions: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

// close position
export const closePosition = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/position/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify({ status: 'closed' }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to close position: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error closing position:', error);
    throw error;
  }
}

// Function to reopen a position
export const reopenPosition = async (id) => {
  const response = await fetch(`${API_BASE}/position/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken,
    },
    // Send 'open' as the status
    body: JSON.stringify({ status: 'open' }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reopen position');
  }
  return response.json();
};

export const deletePosition = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/position/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to delete position: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw error;
  }
};

export const updatePosition = async (positionData) => {
  try {
    const response = await fetch(`${API_BASE}/position/${positionData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify(positionData),
    });
    const data = await response.json();
    console.log('Update position response data:', data);
    if (!response.ok) {
      throw new Error(data.message || `Failed to update position: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};


export const fetchBlogByTitle = async (title) => {
  try {
    const response = await fetch(`${API_BASE}/blog?title=${encodeURIComponent(title)}`, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch blog: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
}


export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify(blogData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to create blog: ${response.statusText}`);
    }
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};



export const createPosition = async (positionData) => {
  try {
    const response = await fetch(`${API_BASE}/position`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify(positionData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to create position: ${response.statusText}`);
    }
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    console.error('Error creating position:', error);
    throw error;
  }
};


// export const fetchCandidateDetails = async () => {
//   try {
//     const response = await fetch(`${API_BASE}/candidate-details`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'access-token': accessToken,
//       },
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || `Failed to fetch candidate details: ${response.statusText}`);
//     }
//     return data;
//   } catch (error) {
//     console.error('Error fetching candidate details:', error);
//     throw error;
//   }
// };

export const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE}/blog/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to delete blog: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};


export const updateBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE}/blog/${blogData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify(blogData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to update blog: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};


export const subscribe = async (email, subscribed) => {
  try {
    const response = await fetch(`${API_BASE}/blog/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
      body: JSON.stringify({ email, subscribed }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    console.log('Subscription successful:', data);
    return data;
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
};

export const fetchCandidate = async () => {
  try {
    const response = await fetch(`${API_BASE}/candidate-details`, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch candidate details: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    throw error;
  }
};

