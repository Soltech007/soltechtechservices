"use client";

import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { projects } from "@/lib/data";
import { MapProjectMarker } from "./map-marker";

export function ProjectMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className="h-[70vh] bg-muted flex items-center justify-center text-center p-8">
                <div>
                    <h3 className="font-apfel2 text-2xl font-bold text-primary">Map Unavailable</h3>
                    <p className="text-muted-foreground mt-2">
                        The Google Maps API key is missing. Please add it to your environment variables
                        <br />
                        as <code className="bg-primary/10 text-primary p-1 rounded-sm text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
                    </p>
                </div>
            </div>
        );
    }

    const mapCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

    return (
        <section>
            <div className="text-center pt-16 sm:pt-24 pb-12">
                <h2 className="font-apfel2 text-3xl font-bold text-primary md:text-4xl">
                    Our Projects Across India
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-[#30454c]">
                    An interactive map showcasing the locations of our key infrastructure projects across the nation.
                </p>
                <div className="mt-4 w-24 h-1 bg-accent mx-auto"></div>
            </div>
            <div className="h-[70vh] w-full">
                <APIProvider apiKey={apiKey}>
                    <Map
                        defaultCenter={mapCenter}
                        defaultZoom={5}
                        mapId="veritas-infra-map"
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        styles={[
                            {
                                "featureType": "all",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#7c93a3"
                                    },
                                    {
                                        "lightness": "-10"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#a0a4a5"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#62838e"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#f0f2f5"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape.man_made",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#e3e3e3"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 45
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#c1c6c8"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#a3ccde"
                                    }
                                ]
                            }
                        ]}
                    >
                        {projects.map((project) => (
                            <MapProjectMarker key={project.id} project={project} />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </section>
    );
}
