import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const item = [
    {
        title: "Injury Prevention",
        text: "Worn out shoes can lead to shin splints, plantar fasciitis, or joint pain. By tracking mileage, runners can avoid potential injuries by replacing shoes before they wear out."
    },
    {
        title: "Wear and Tear",
        text: "Depending on the shoe brand, most running shoes last between 300-500 miles. After this range, shoes can cause injuries."
    },
    {
        title: "Performance Optimization",
        text: "Properly cushioned and supportive shoes improve comfort and running efficiency, allowing runners to maintain optimal performance."
    },
    {
        title: "Budgeting and Planning",
        text: "Knowing when your shoe will need to be replaced, it can help you plan purchases especially on shoes going on sale."
    },
    {
        title: "Tracking Trends",
        text: "Keeping track of your shoes helps understand how specific shoes perform and allows you to choose what model suit their needs best."
    },
]

export default function LearnMore() {
    return (
        <main className="text-center">
            <h1 className="font-bold text-4xl mb-2">Why Keep Track Of Shoe Mileage?</h1>
            <div className="flex justify-center">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {item.map((i, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                            <span className="font-bold text-2xl">{i.title}</span>
                                            <span className="">{i.text}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </main>
    )
}