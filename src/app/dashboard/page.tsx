import ShoeList from "@/app/dashboard/_components/shoelist";
import UploadButton from "@/app/dashboard/_components/upload-button";

export default function Dashboard() {
    return (
        <div className="container mx-auto pt-12">
            <UploadButton />
            <ShoeList />
        </div>
    )
}