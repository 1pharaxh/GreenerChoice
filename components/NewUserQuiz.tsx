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

export default function NewUserQuiz() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setShowDialog(true);
    }
  }, []);

  const handleSubmission = async () => {
    // TODO: Call api first
    localStorage.setItem("user", "true");
    setShowDialog(false);
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
              <Label htmlFor="name">Height</Label>
              <Input id="name" placeholder="Measure it" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Age</Label>
              <Input id="name" placeholder="Make sure you not too old" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Weight</Label>
              <Input id="name" placeholder="Dont be fat" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Gender</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Female</SelectItem>
                  <SelectItem value="sveltekit">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter className="w-full">
          <div className=" flex flex-row items-center justify-between w-full">
            <Button onClick={handleSubmission} variant="success">
              Save
            </Button>

            <DialogClose onClick={handleClose} asChild>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
