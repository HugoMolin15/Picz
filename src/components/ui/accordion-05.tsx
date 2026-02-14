"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const items = [
    {
        id: "01",
        title: "How does the AI select my best pictures?",
        content:
            "Our AI analyzes technical aspects like focus and lighting, but also emotional cues like smiles and composition. It automatically filters out duplicates and blurry shots to keep only the gems.",
    },
    {
        id: "02",
        title: "Can I find photos from specific events?",
        content:
            "Yes! Our 'Smart Clusters' technology groups photos by time and location. Whether it's a weekend trip or a wedding, Picz identifies the event and organizes it for you.",
    },
    {
        id: "03",
        title: "How safe are my memories?",
        content:
            "Security is our priority. All photos are encrypted at rest and in transit. We don't use your personal data to train models that would compromise your privacy.",
    },
    {
        id: "04",
        title: "Can I share albums with family?",
        content:
            "Absolutely. You can create shared albums where everyone can contribute and download high-resolution copies. Perfect for family reunions and collaborative travel logs.",
    },
    {
        id: "05",
        title: "What is a 'Weekly Bundle'?",
        content:
            "Every week, Picz sends you a curated set of highlights from your past few days, or long-forgotten memories from years ago. It's like a personalized magazine of your life.",
    },
    {
        id: "06",
        title: "Does it support RAW files?",
        content:
            "Yes, Picz Pro supports most RAW formats, ensuring professional photographers can backup and organize their workflow with the same AI intelligence.",
    },
];

export function Accordion05() {
    return (
        <div className="w-full max-w-4xl mx-auto py-20 bg-white px-8 mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-black tracking-tighter">Common Questions</h2>
            <Accordion type="single" defaultValue="01" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="last:border-b-0 border-b-gray-100">
                        <AccordionTrigger className="text-left pl-0 overflow-hidden text-black/30 duration-200 hover:no-underline cursor-pointer data-[state=open]:text-black [&>svg]:hidden">
                            <div className="flex flex-1 items-start gap-4">
                                <p className="text-sm font-mono mt-1">{item.id}</p>
                                <h1
                                    className={`uppercase relative text-left text-2xl md:text-4xl tracking-tighter`}
                                >
                                    {item.title}
                                </h1>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="text-gray-500 pb-8 pl-10 md:pl-16 text-lg max-w-2xl">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
