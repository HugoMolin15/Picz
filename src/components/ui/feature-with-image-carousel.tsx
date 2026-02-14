import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/ui/aurora-text";

function Feature() {
    return (
        <div className="w-full pt-32 pb-10 lg:pt-52 lg:pb-20 bg-white">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                    <div className="flex gap-4 flex-col items-start">
                        <div>
                            <Badge variant="outline" className="border-none p-0 text-black uppercase tracking-widest text-[10px] font-semibold">
                                <AuroraText>Personalized Albums</AuroraText>
                            </Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-lg md:text-2xl lg:text-4xl tracking-tighter lg:max-w-xl font-bold text-left text-black">
                                Memories curated by AI
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                Stop scrolling through thousands of duplicates. Our AI selects your best shots, groups them by event, and creates stunning personalized albums automatically.
                            </p>
                        </div>
                    </div>
                    <div className="w-full max-w-full">
                        <div className="flex rounded-md aspect-video overflow-hidden items-center justify-center shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1000&auto=format&fit=crop"
                                alt="AI Curation"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Feature as FeatureWithImageCarousel };
