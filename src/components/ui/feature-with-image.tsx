import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/ui/aurora-text";

function Feature() {
    return (
        <div className="w-full py-10 lg:py-20 bg-white">
            <div className="container mx-auto px-8">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                    <div className="rounded-md w-full aspect-video h-full flex-1 overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1000&auto=format&fit=crop"
                            alt="AI Search"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
                        <div>
                            <Badge variant="outline" className="border-none p-0 text-black uppercase tracking-widest text-[10px] font-semibold">
                                <AuroraText>Smart Search</AuroraText>
                            </Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-lg md:text-2xl lg:text-4xl tracking-tighter lg:max-w-xl font-bold text-left text-black">
                                Find anything by describing it
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                Our semantic search understands meaning, not just keywords. Type "family dinner at the lake" and see your memories come alive in seconds.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Feature as FeatureWithImage };
