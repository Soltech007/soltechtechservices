"use client";

import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { summarizeProjectDetails } from "@/ai/flows/summarize-project-details";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { projects as staticProjects } from "@/lib/data";

type Project = (typeof staticProjects)[0];

interface MapProjectMarkerProps {
  project: Project;
}

export function MapProjectMarker({ project }: MapProjectMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowShown((prev) => !prev);
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeProjectDetails({
        projectName: project.title,
        projectDescription: project.description,
        location: project.location,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget,
        keyPersonnel: project.keyPersonnel,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Could not generate summary at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: project.lat, lng: project.lng }}
        onClick={handleMarkerClick}
      >
        <button type="button" className="relative flex h-4 w-4 focus:outline-none" aria-label={`View project: ${project.title}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white"></span>
        </button>
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoWindowShown(false)}
        >
          <div className=" font-apfel2p-2 max-w-sm">
            <h3 className="font-apfel2 text-lg font-bold text-primary">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.location}</p>
            {isLoading ? (
              <div className="flex items-center justify-center my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Generating Summary...</span>
              </div>
            ) : summary ? (
              <div className="text-sm my-4 p-3 bg-secondary rounded-md border">{summary}</div>
            ) : null}

            <Button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              size="sm"
              className="w-full bg-accent hover:bg-accent/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Generate AI Summary"
              )}
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
