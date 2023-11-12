"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Slider } from "./ui/slider";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function NewUserQuiz({ email }: { email: string }) {
  const [showDialog, setShowDialog] = useState(false);

  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [activityLevel, setActivityLevel] = useState("sedentary");

  const [error, setError] = useState("");

  const fetchUserData = async () => {
    const getresponse = await fetch(`${apiUrl}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getdata = await getresponse.json();
    if (getdata.length !== 0) {
      console.log("GOT_DATA_NewUserQuiz", getdata);
      localStorage.setItem("user", "true");
      setShowDialog(false);
      return;
    } else {
      setShowDialog(true);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setShowDialog(true);
      return;
    }
    fetchUserData();
  }, []);
  const apiUrl =
    "https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/";

  const handleSubmission = async () => {
    if (weight && height && age && gender && activityLevel) {
      setError("");
      const body = {
        email: email,
        weight: weight,
        height: height,
        age: age,
        gender: gender,
        activity_level: activityLevel,
        daily_calories_count: 0,
      };
      console.log(body);
      try {
        const apiUrl =
          "https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        localStorage.setItem("user", "true");
        setShowDialog(false);
      } catch (error) {
        console.log("NewUserQuiz_Submit", error);
        setError("Something went wrong");
      }
    } else {
      setError("Please fill out all fields");
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog}>
      <DialogContent className="sm:max-w-md targetme">
        <DialogHeader>
          <DialogTitle>Answer these questions🔫</DialogTitle>
          <DialogDescription>Riddle me this</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Weight</Label>
              <Input
                onChange={(e) => {
                  //@ts-ignore
                  setWeight(parseInt(e.target.value));
                }}
                type="number"
                placeholder="Dont be fat"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Height</Label>
              <Input
                onChange={(e) => {
                  //@ts-ignore
                  setHeight(parseInt(e.target.value));
                }}
                type="number"
                id="name"
                placeholder="Measure it"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Age</Label>
              <Input
                onChange={(e) => {
                  //@ts-ignore
                  setAge(parseInt(e.target.value));
                }}
                type="number"
                id="name"
                placeholder="Make sure you not too old"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Gender</Label>
              <Select
                onValueChange={(e) => {
                  //@ts-ignore
                  setGender(e);
                }}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-3.5">
              <Label htmlFor="name">
                Activity Level -{" "}
                <span className="text-green-600">{activityLevel}</span>
              </Label>
              <Slider
                onValueChange={(e) => {
                  if (e[0] === 0) {
                    setActivityLevel("sedentary");
                  } else if (e[0] === 1) {
                    setActivityLevel("lightly active");
                  }
                  if (e[0] === 2) {
                    setActivityLevel("moderately active");
                  }
                  if (e[0] === 3) {
                    setActivityLevel("very active");
                  }
                  if (e[0] === 4) {
                    setActivityLevel("extra active");
                  }
                }}
                defaultValue={[0]}
                max={5}
                step={1}
              />
            </div>
          </div>
        </form>
        {error && (
          <div className="flex flex-row items-center justify-start w-full gap-2 animate-bounce">
            <InfoCircledIcon className="h-5 w-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <DialogFooter className="w-full">
          <div className=" flex flex-row items-center justify-between w-full">
            <Button onClick={handleSubmission} variant="success">
              Save
            </Button>

            <DialogClose onClick={handleClose} asChild>
              <Button
                type="button"
                disabled={error ? true : false}
                variant="destructive"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
