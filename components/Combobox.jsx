"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currentGenre } from "@/hooks/current-genre";

const genres = [
  {
    value: "rock",
    label: "Rock",
  },
  {
    value: "poprock",
    label: "Pop rock",
  },
  {
    value: "pop",
    label: "Pop",
  },
  {
    value: "seasonal",
    label: "Seasonal",
  },
  {
    value: "folk",
    label: "Folk",
  },
  {
    value: "country",
    label: "Country",
  },
  {
    value: "electropop",
    label: "Electropop",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const updateGenre = currentGenre((state) => state.updateGenre);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? genres.find((g) => g.value === value)?.label
            : "Select Genre..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search Genre..." />
          <CommandEmpty>No Genre found.</CommandEmpty>
          <CommandGroup>
            {genres.map((g) => (
              <CommandItem
                key={g.value}
                value={g.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  updateGenre(g.label);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === g.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {g.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
