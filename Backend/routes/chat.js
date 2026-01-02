import express from "express";
import Thread from "../models/Thread.js";
import getOpenRouterAPIResponse from "../utils/openRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//This (/test) route is created just to verify that the API call is working.
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "test-thread-2",
      title: "Test new Thread-2",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Route to fetch all threads from the database.
router.get("/thread", authMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Route to fetch a specific thread by its threadId.
router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({
      threadId,
      userId: req.user._id,
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Route to delete a specific thread by its threadId.
router.delete("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      userId: req.user._id,
    });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

//Creates thread if not exists
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let userId = null;

  //Try to extract user from token (optional auth)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      userId = null;
    }
  }

  try {
    //Guest user → no DB save
    if (!userId) {
      const assistantReply = await getOpenRouterAPIResponse(message);
      return res.json({ reply: assistantReply });
    }

    //Logged-in user → save thread
    let thread = await Thread.findOne({ threadId, userId });

    if (!thread) {
      thread = new Thread({
        threadId,
        userId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenRouterAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();

    res.json({ reply: assistantReply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
