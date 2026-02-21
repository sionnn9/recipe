export const processImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageBuffer = req.file.buffer;

    // 🔥 HERE you send imageBuffer to your AI model
    // Example placeholder:
    const aiResult = await fakeAIModel(imageBuffer);

    res.status(200).json({
      message: "Image processed successfully",
      result: aiResult,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Example dummy AI function (replace with real model call)
const fakeAIModel = async (buffer) => {
  return {
    size: buffer.length,
    prediction: "Example AI output",
  };
};
