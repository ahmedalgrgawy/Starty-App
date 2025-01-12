import { formatDateString } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };


const StartUpCard = ({ post }: {
    post: StartupTypeCard
}) => {

    const { _id, _createdAt, views, description, image, category, title, author } = post

    return (
        <li key={_id} className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDateString(_createdAt)}
                </p>

                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">
                        {views}
                    </span>
                </div>

            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {author?.name}
                        </p>
                    </Link>

                    <Link href={`/startup/${_id}`} >
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>

                </div>

                <Link href={`/user/${author?._id}`} className="startup-card_desc line-clamp-2">
                    <Image src={author?.image || "https://placehold.co/600x400"} width={48} height={48} className="rounded-full" alt="placeholder" priority={true} />
                </Link>

            </div>

            <Link href={`/startup/${_id}`} >
                <p className="startup-card_desc">
                    {description}
                </p>

                <Image src={image || "https://placehold.co/600x400"} alt="placeholder" width={600} height={400} className="startup-card_img" />

            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li >
    )
}

export default StartUpCard