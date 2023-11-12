import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { ShadowOuterIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function QuizCard({ email }: { email: string }) {
  const [ans, setAns] = React.useState("2");
  const [options, setOptions] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [error, setError] = React.useState("");
  const [optionsFail, setOptionsFail] = React.useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selected !== ans) {
      setError("wrong");
      return;
    }
    setError("correct");
    return;
  };

  const fetchQuestion = async () => {
    const api =
      "https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/get_daily_question";
    try {
      const res = await fetch(`${api}/?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // set question, ans and options
      setQuestion(data["Question"]);
      setAns(data["Correct Option"]);
      setOptions(data["Options"]);
      console.log("GOT QUESSTION ", data);
      setOptionsFail(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, [email]);
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Your Daily Quiz</CardTitle>
        <CardDescription>
          Strengthen your{" "}
          <span className="text-green-700 font-sans">Green Intution</span>{" "}
          today!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-lg text-muted-foreground">{question}</p>
        {selected && (
          <p className="text-lg text-red-300">
            You have selected{" "}
            <span className="text-green-300 font-bold"> - {selected}</span>
          </p>
        )}
        <div className="grid grid-cols-2 gap-6">
          {options &&
            options.map((elem: any, index: any) => (
              <Button
                key={index}
                onClick={() => setSelected(elem)}
                variant="outline"
              >
                <ShadowOuterIcon className="mr-2 h-4 w-4" />
                {elem}
              </Button>
            ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        {error === "correct" && (
          <p className="text-green-700 font-bold ">
            🎊🎊Hurray you have the correct answer
          </p>
        )}

        {error === "wrong" && (
          <p className="text-red-700 font-bold">
            😭😭Sorry you have the wrong answer, correct ans - {ans}
          </p>
        )}

        {optionsFail && (
          <p className="text-red-700 font-bold">
            Open AI error, please try again later
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          disabled={error === "correct"}
          onClick={handleSubmit}
          className="w-full"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
