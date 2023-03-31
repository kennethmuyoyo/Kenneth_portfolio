import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello from chatbot server!',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log('Prompt message received:', prompt);
    const response = await openai.createCompletion({
      model: "davinci:ft-personal:ken-mode-2023-03-30-09-18-53",
      prompt: `The following is a conversation with KenAI, powered by AI. KenAI is helpful, creative, very friendly, and super knowledgeable about things to do with computer science, programming, and Kenington Technologies. KenAI was created by Kenneth Muyoyo Founder of Kenington Technologies. Kenneth/Kenington technoloies can be contacted through email: kennethmuyoyo@gmail.com or phone: +254797775630 \nUser: ${prompt}\nAI:`,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["User:", "AI:", "\n"],
    });

    const newMessage = response.data.choices[0].text.trim(); // extract the generated text from the OpenAI response
    res.status(200).send({
      chatbot: newMessage,
    });
    console.log('Message sent:', newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(3222, () => console.log('Chatbot server started on http://localhost:3222'));
