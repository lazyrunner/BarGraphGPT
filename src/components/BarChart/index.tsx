import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const OPENAI_API_KEY = "<Inset API KEY>";

const DEFAULT_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.3,
  max_tokens: 800,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const defaultData = {
  labels: ["John", "Jack", "Jill", "Tom"],
  datasets: [
    {
      label: "Dataset 1",
      data: [2, 2, 4, 1],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

interface prop {
  prompt: string;
}

export default function BarChart({ prompt }: prop) {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    if (prompt.trim().length > 0) queryPrompt(prompt);
  }, [prompt]);
  const queryPrompt = (prompt: string) => {
    fetch("prompts/main.prompt")
      .then((response) => response.text())
      .then((text) => text.replace("$prompt", prompt))
      .then((text) => text.replace("$cState", JSON.stringify(data)))
      .then((prompt) => {
        console.log(prompt);

        const params = { ...DEFAULT_PARAMS, prompt: prompt };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(OPENAI_API_KEY),
          },
          body: JSON.stringify(params),
        };
        fetch("https://api.openai.com/v1/completions", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const text = data.choices[0].text;
            console.log(text);
            const new_graph = JSON.parse(text);
            console.log(new_graph);
            setData(new_graph);
            document.body.style.cursor = "default";
          })
          .catch((error) => {
            console.log(error);
            document.body.style.cursor = "default";
          });
      });
  };

  return <Bar options={options} data={data} />;
}
