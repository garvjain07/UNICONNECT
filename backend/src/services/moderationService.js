const axios = require('axios');

const withRetry = async (fn, attempts = 3) => {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise((resolve) => setTimeout(resolve, 200 * (i + 1)));
    }
  }
  throw lastError;
};

const BEER_BLOCK_REASON = 'beer_bottle_detected';
<<<<<<< HEAD
const BEER_BLOCK_MESSAGE = 'Beer bottles are not allowed to be listed. Contact admin if this is incorrect.';
=======
>>>>>>> repo2/main

const callModeration = async (payload) => {
  if (!process.env.ML_SERVICE_URL) return { flagged: false, score: 0 };
  try {
    const data = await withRetry(() =>
      axios
        .post(`${process.env.ML_SERVICE_URL}/predict/moderation`, payload, { timeout: 5000 })
        .then((res) => res.data)
    );
<<<<<<< HEAD
    return data;
  } catch (err) {
    console.error('Moderation call failed', err.message);
=======
    console.info('[ML] moderation result', data);
    return data;
  } catch (_err) {
>>>>>>> repo2/main
    return { flagged: false, score: 0, reason: 'ml_unreachable' };
  }
};

const checkAlcoholImage = async (imageUrl) => {
  if (!process.env.ML_SERVICE_URL || !imageUrl) {
    return { blocked: false, reason: 'ml_disabled' };
  }

<<<<<<< HEAD
  // Recommended behavior: block immediately and show a friendly error to the seller.
=======
>>>>>>> repo2/main
  try {
    const data = await withRetry(() =>
      axios
        .post(
          `${process.env.ML_SERVICE_URL}/predict/url`,
          { image_url: imageUrl },
<<<<<<< HEAD
          { timeout: 8000 }
        )
        .then((res) => res.data)
=======
          { timeout: 30000 }
        )
        .then((res) => res.data),
      1
>>>>>>> repo2/main
    );

    const predictedClass = data?.predicted_class || '';
    const probability = Number(data?.probability ?? 0);
    const blocked = Boolean(data?.blocked);

    console.info('[ML] alcohol prediction', {
<<<<<<< HEAD
      filename: data?.filename,
=======
>>>>>>> repo2/main
      predicted_class: predictedClass,
      probability,
      threshold: data?.threshold,
      blocked,
    });

    return {
      blocked,
      reason: blocked ? BEER_BLOCK_REASON : 'clear',
      predicted_label: predictedClass,
      confidence: probability,
      flagged: blocked,
<<<<<<< HEAD
      is_beer: blocked,
      scores: {},
      probability,
      filename: data?.filename,
      recommendation: BEER_BLOCK_MESSAGE,
      needs_review: false,
    };
  } catch (err) {
    console.error('Alcohol detection call failed', err.message);
=======
      needs_review: false,
    };
  } catch (_err) {
>>>>>>> repo2/main
    return {
      blocked: false,
      needs_review: true,
      error: 'ml_unreachable',
<<<<<<< HEAD
      recommendation: BEER_BLOCK_MESSAGE,
=======
>>>>>>> repo2/main
    };
  }
};

const proxyRecommendations = async (payload) =>
  withRetry(() =>
    axios
      .post(`${process.env.ML_SERVICE_URL}/predict/recommendations`, payload, { timeout: 5000 })
      .then((res) => res.data)
  );

module.exports = { callModeration, checkAlcoholImage, proxyRecommendations };
