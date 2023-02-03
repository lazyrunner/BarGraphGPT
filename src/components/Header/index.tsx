import { useState } from "react";

interface props {
  onSubmit: Function;
}

export default function Header({ onSubmit }: props) {
  const [promptValue, setPrompt] = useState("");
  const onSubmitValue = () => {
    onSubmit(promptValue);
  };

  const handleChange = (event: any) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="mx-auto px-6">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start ">
          <a href="#">Bar Graph GPT</a>
        </div>
        <div className="w-full ">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Jack has 12 and John has 12"
              onChange={handleChange}
              value={promptValue}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              onClick={onSubmitValue}
              type="button"
            >
              Prompt
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
}
