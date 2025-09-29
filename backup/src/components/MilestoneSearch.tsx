import { useNavigate } from "@tanstack/react-router";
import { FC, useRef } from "react";

export const MilestoneSearch: FC<{}> = () => {
  const searchRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);

  const navigate = useNavigate({ from: "/app/epics/$epicId/milestones/" });

  const updateSearchParams = () => {
    navigate({
      to: ".",
      search: () => {
        return { search: searchRef.current.value };
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input placeholder="Search" type="text" className="border p-2 w-13" ref={searchRef} />
      </div>
      <div>
        <button className="border p-2" onClick={updateSearchParams}>
          Search
        </button>
      </div>
    </div>
  );
};
