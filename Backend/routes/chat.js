import express from "express";
import Thread from "../models/Thread.js";
import getOpenRouterAPIResponse from "../utils/openRouter.js";

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
router.get("/thread", async (req, res) => {
  try {
    //Fetch all threads from the database, sorted by updatedAt in descending order(i.e. most recent data on top)
    const threads = await Thread.find().sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Route to fetch a specific thread by its threadId.
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!threadId) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Route to delete a specific thread by its threadId.
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete threed" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  // Validate input
  if (!threadId || !message) {
    return res.status(400).json({ error: "threadId and message are required" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      //create a new thread in Db
      thread = new Thread({
        threadId,
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
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
